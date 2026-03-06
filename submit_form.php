<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    $response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

    if ($name && $email && $message) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $to = 'dev.jagtechno@gmail.com'; 
            $subject = 'New Contact Form Submission from JagTechno Website';
            
            $email_content = "Name: $name\n";
            $email_content .= "Email: $email\n\n";
            $email_content .= "Message:\n$message\n";
            
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion();

            if (mail($to, $subject, $email_content, $headers)) {
                $response['status'] = 'success';
                $response['message'] = "Thank you, $name. Your message has been sent successfully.";
            } else {
                $response['message'] = "Sorry, there was an error sending your message. Please try again later.";
            }
        } else {
            $response['message'] = "Invalid email address. Please enter a valid email.";
        }
    } else {
        $response['message'] = "All fields are required. Please fill out the form completely.";
    }

    // Check if the request expects JSON (AJAX)
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        echo json_encode($response);
    } else {
        // Fallback for non-AJAX requests (redirect)
        if ($response['status'] === 'success') {
            header("Location: index.html?status=success");
        } else {
            header("Location: index.html?status=error&message=" . urlencode($response['message']));
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
