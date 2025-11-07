<?php
// send-ithelp.php — handles the contact form and returns JSON
header('Content-Type: application/json; charset=utf-8');

try {
  // Only allow POST
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
  }

  // === CONFIG ===
  $to = "info@nouvatech.com"; // <-- change to your destination inbox
  $subject = "NouvaTech Contact Request";

  // === SANITIZE INPUTS ===
  $name = htmlspecialchars(trim($_POST['name'] ?? ''));
  $email = htmlspecialchars(trim($_POST['email'] ?? ''));
  $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
  $message = htmlspecialchars(trim($_POST['message'] ?? ''));
  $services = $_POST['services'] ?? [];

  // === VALIDATION ===
  $errors = [];
  if ($name === "") $errors[] = "Name is required";
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email required";
  if ($phone === "") $errors[] = "Phone number is required";

  if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(", ", $errors)]);
    exit;
  }

  // === BUILD MESSAGE ===
  $serviceList = "";
  if (!empty($services)) {
    $serviceList = "<ul>";
    foreach ($services as $service) {
      $serviceList .= "<li>" . htmlspecialchars($service) . "</li>";
    }
    $serviceList .= "</ul>";
  }

  $body = "
    <h2>New IT Help Request</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Services:</strong> $serviceList</p>
    <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
  ";

  $headers = [
    "From: NouvaTech Website <no-reply@nouvatech.com>",
    "Reply-To: $email",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8"
  ];

  // === SEND EMAIL ===
  $sent = @mail($to, $subject, $body, implode("\r\n", $headers));

  if ($sent) {
    echo json_encode(['success' => true]);
  } else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail failed to send.']);
  }

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Server error.']);
}
