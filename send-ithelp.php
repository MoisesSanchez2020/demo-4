<?php
// send-ithelp.php
// Return JSON always
header('Content-Type: application/json; charset=utf-8');

try {
  // Only allow POST
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
  }

  // --- CONFIG ---
  $to = 'info@nouvatech.com';   // <-- CHANGE THIS TO YOUR INBOX
  $subject = 'New Contact Request — NouvaTech Website';

  // --- Collect & sanitize ---
  $name    = trim($_POST['name']    ?? '');
  $email   = trim($_POST['email']   ?? '');
  $phone   = trim($_POST['phone']   ?? '');
  $message = trim($_POST['message'] ?? '');
  $services = $_POST['services'] ?? []; // array of checked boxes if present

  // --- Validate ---
  $errors = [];
  if ($name === '')                        $errors[] = 'Name is required';
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
  if ($phone === '')                       $errors[] = 'Phone is required';

  if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode('; ', $errors)]);
    exit;
  }

  // --- Compose HTML body ---
  $servicesText = '';
  if (is_array($services) && count($services)) {
    $servicesText = '<ul style="margin:0;padding-left:18px;">';
    foreach ($services as $s) {
      $servicesText .= '<li>'.htmlspecialchars($s).'</li>';
    }
    $servicesText .= '</ul>';
  } else {
    $servicesText = '<em>No specific services selected</em>';
  }

  $htmlBody =
    '<h2 style="margin:0 0 12px;font-family:sans-serif;">New Contact Request</h2>'.
    '<table cellspacing="0" cellpadding="6" border="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">'.
    '<tr><td><strong>Name:</strong></td><td>'.htmlspecialchars($name).'</td></tr>'.
    '<tr><td><strong>Email:</strong></td><td>'.htmlspecialchars($email).'</td></tr>'.
    '<tr><td><strong>Phone:</strong></td><td>'.htmlspecialchars($phone).'</td></tr>'.
    '<tr><td valign="top"><strong>Services:</strong></td><td>'.$servicesText.'</td></tr>'.
    '<tr><td valign="top"><strong>Message:</strong></td><td>'.nl2br(htmlspecialchars($message)).'</td></tr>'.
    '</table>';

  // --- Handle optional file attachment ---
  $hasAttachment = isset($_FILES['attachment']) && is_uploaded_file($_FILES['attachment']['tmp_name']);
  $maxSize = 10 * 1024 * 1024; // 10 MB
  $allowedExt = ['jpg','jpeg','png','pdf','docx'];

  $headers = [];
  $fromName = $name ?: 'Website Contact';
  $fromEmail = $email; // we’ll still set Reply-To to the sender

  if ($hasAttachment) {
    $fileTmp = $_FILES['attachment']['tmp_name'];
    $fileName = $_FILES['attachment']['name'];
    $fileSize = $_FILES['attachment']['size'];

    // Validate size
    if ($fileSize > $maxSize) {
      http_response_code(413);
      echo json_encode(['success' => false, 'message' => 'Attachment exceeds 10 MB limit']);
      exit;
    }

    // Validate extension
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt)) {
      http_response_code(415);
      echo json_encode(['success' => false, 'message' => 'Attachment type not allowed']);
      exit;
    }

    $fileData = file_get_contents($fileTmp);
    $fileB64  = chunk_split(base64_encode($fileData));
    $mimeType = mime_content_type($fileTmp) ?: 'application/octet-stream';

    // Multipart email with attachment
    $boundary = '==Multipart_Boundary_x'.md5(uniqid(time())).'x';

    $headers[] = 'From: "'.$fromName.'" <no-reply@nouvatech.com>';
    $headers[] = 'Reply-To: '.$fromEmail;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/mixed; boundary="'.$boundary.'"';

    $body  = "This is a multi-part message in MIME format.\r\n\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $htmlBody."\r\n\r\n";

    $body .= "--$boundary\r\n";
    $body .= "Content-Type: $mimeType; name=\"".addslashes($fileName)."\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"".addslashes($fileName)."\"\r\n\r\n";
    $body .= $fileB64."\r\n";
    $body .= "--$boundary--";

  } else {
    // Simple HTML email
    $headers[] = 'From: "'.$fromName.'" <no-reply@nouvatech.com>';
    $headers[] = 'Reply-To: '.$fromEmail;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';

    $body = $htmlBody;
  }

  // --- Send ---
  $headersStr = implode("\r\n", $headers);
  $sent = @mail($to, $subject, $body, $headersStr);

  if ($sent) {
    echo json_encode(['success' => true]);
  } else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail server failed to send']);
  }

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Server error']);
}
