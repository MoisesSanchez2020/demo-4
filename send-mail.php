<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Sanitize and validate fields
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone = strip_tags(trim($_POST["phone"]));
  $message = trim($_POST["message"]);

  if (empty($name) || empty($email) || empty($message)) {
    echo "error";
    exit;
  }

  // Recipient email
  $to = "info@nouvatech.com"; // 🔹 Cambia este correo por el del cliente
  $subject = "New Tech Evaluation Request from $name";

  // Message body
  $body = "You have received a new tech evaluation request:\n\n";
  $body .= "Name: $name\n";
  $body .= "Email: $email\n";
  $body .= "Phone: $phone\n";
  $body .= "Message:\n$message\n";

  $headers = "From: $name <$email>";

  // Send the email
  if (mail($to, $subject, $body, $headers)) {
    echo "success";
  } else {
    echo "error";
  }
}
?>
