<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set the SMTP configuration using ini_set()
    ini_set('SMTP', 'localhost');
    ini_set('smtp_port', 25);
    
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $number = $_POST["number"];
    $message = $_POST["message"];

    // Validate form data (you can add more validation as needed)
    if (empty($name) || empty($email) || empty($number) || empty($message)) {
        echo "All fields are required!";
    } else {
        // Set the 'sendmail_from' to the user's submitted email address
        ini_set('sendmail_from', $email);

        // Send the email
        $to = "pangolins.mw@gmail.com"; // Replace with the recipient's email address
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $message = "Name: $name<br>Email: $email<br>Subject: $number<br>Message:<br>$message";

        if (mail($to, $number, $message, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Oops! Something went wrong.";
        }
    }
}
?>

