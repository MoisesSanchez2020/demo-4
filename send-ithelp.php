<?php
// process-form.php
// GoDaddy-friendly mail handler with basic validation and optional file attachment.
// Returns JSON { success: bool, message: string } for AJAX.

header('Content-Type: application/json');

// CONFIG
$TO_EMAIL   = 'info@nouvatech.com';              // <-- Cambia aquí si necesitas
$FROM_EMAIL = 'no-reply@nouvatech.com';          // <-- Debe ser tu propio dominio en GoDaddy
$SUBJECT    = 'New Website Request (NouvaTech)';

// Basic honeypot
if (!empty($_POST['website'])) {
  echo json_encode(['success' => true, 'message' => 'Thank you!']); // silently ignore
  exit;
}

// Required fields
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$type    = trim($_POST['request_type'] ?? '');
$urgency = trim($_POST['urgency'] ?? '');
$msg     = trim($_POST['message'] ?? '');
$consent = isset($_POST['consent']);

$company   = trim($_POST['company']  ?? '');
$location  = trim($_POST['location'] ?? '');
$contact_t = trim($_POST['contact_time'] ?? '');
$systems   = $_POST['systems'] ?? [];

if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$phone || !$type || !$urgency || !$msg || !$consent) {
  echo json_encode(['success' => false, 'message' => 'Please fill all required fields (marked with *).']);
  exit;
}

// Build message body
$bodyLines = [
  "Name: $name",
  "Email: $email",
  "Phone: $phone",
  "Company: " . ($company ?: '—'),
  "Location: " . ($location ?: '—'),
  "Request Type: $type",
  "Urgency: $urgency",
  "Best Contact Time: " . ($contact_t ?: '—'),
  "Systems Involved: " . (is_array($systems) && count($systems) ? implode(', ', $systems) : '—'),
  "",
  "Message:",
  $msg,
  "",
  "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
  "UA: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown'),
];

$bodyText = implode("\r\n", $bodyLines);

// Attachment handling (optional)
$hasAttachment = isset($_FILES['attachment']) && is_uploaded_file($_FILES['attachment']['tmp_name']);
$boundary = md5(uniqid(time(), true));
$headers  = "From: NouvaTech <$FROM_EMAIL>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";

if ($hasAttachment) {
  $fileTmp  = $_FILES['attachment']['tmp_name'];
  $fileName = basename($_FILES['attachment']['name']);
  $fileSize = $_FILES['attachment']['size'];
  $fileType = mime_content_type($fileTmp);

  if ($fileSize > 10 * 1024 * 1024) {
    echo json_encode(['success' => false, 'message' => 'Attachment too large (max 10MB).']);
    exit;
  }

  $fileData = chunk_split(base64_encode(file_get_contents($fileTmp)));

  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

  $message  = "--$boundary\r\n";
  $message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
  $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
  $message .= $bodyText . "\r\n\r\n";

  $message .= "--$boundary\r\n";
  $message .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
  $message .= "Content-Transfer-Encoding: base64\r\n";
  $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
  $message .= $fileData . "\r\n";
  $message .= "--$boundary--";

} else {
  $headers .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
  $message = $bodyText;
}

// Some hosts (incl. GoDaddy) prefer the additional parameter -f for envelope sender
$additional_params = "-f$FROM_EMAIL";
$ok = mail($TO_EMAIL, $SUBJECT, $message, $headers, $additional_params);

if ($ok) {
  echo json_encode(['success' => true, 'message' => 'Thanks! Your request was sent. We’ll get back to you shortly.']);
} else {
  echo json_encode(['success' => false, 'message' => 'We could not send your request. Please email us at info@nouvatech.com']);
}
