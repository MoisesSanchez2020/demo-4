<?php
// === NouvaTech Contact Form Handler ===

// Configure your recipient email
$to = "info@nouvatech.com"; // 🔧 change to your real business email
$subject = "New Tech Evaluation Request";

// Sanitize user input
$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$phone = htmlspecialchars($_POST['phone'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
  echo "error";
  exit;
}

// Build the email content
$body = "
  <h2>New Tech Evaluation Form Submission</h2>
  <p><strong>Name:</strong> {$name}</p>
  <p><strong>Email:</strong> {$email}</p>
  <p><strong>Phone:</strong> {$phone}</p>
  <p><strong>Message:</strong><br>{$message}</p>
  <hr>
  <p>Sent from NouvaTech website contact form</p>
";

// Headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$name} <{$email}>\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
  echo "success"; // ✅ JS checks for this
} else {
  echo "error";
}
?>
