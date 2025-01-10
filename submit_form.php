<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!empty($name) && !empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $to = 'dev.jagtechno@gmail.com'; // Replace with your email address
            $subject = 'New Contact Form Submission';
            $body = "Name: $name\nEmail: $email\nMessage:\n$message";
            $headers = "From: $email\r\nReply-To: $email";

            if (mail($to, $subject, $body, $headers)) {
                echo "<p>Thank you, $name. Your message has been sent successfully.</p>";
            } else {
                echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
            }
        } else {
            echo "<p>Invalid email address. Please enter a valid email.</p>";
        }
    } else {
        echo "<p>All fields are required. Please fill out the form completely.</p>";
    }
} else {
    echo "<p>Invalid request method.</p>";
}
?>

