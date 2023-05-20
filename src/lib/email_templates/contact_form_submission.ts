export const emailTemplate = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <title>Contact Form Email</title>
    <style>
      /* Add your desired CSS styles here */
        body {
            background-color: #222222;
            border-sizing: border-box;
        }

        .title {
            font-size: 1rem; 
            color: white;
        }
        .header {
            background-color: teal;
            padding: 1rem 0; 
            text-align: center; 
        }

        table {
            padding: 1rem; 
        }

        td {
            padding: 0.5rem 0;
            vertical-align: top; 
        }

        td.second-column {
            padding-left: 0.5rem; 
        }

        footer {
            padding: 1rem; 
            background-color: teal; 
        }
    </style>
  </head>
  <body>
    <header class='header'>
      <!-- Add your website logo here -->
      <!--  <img src="path/to/logo.png" alt="Website Logo" /> -->
      <h1 class='title'>Contact Form Submission</h1>
    </header>
    <main>
    <table>
    <tr>
        <td >Email:</td>
        <td class="second-column">{email}</td>
    </tr>
    <tr>
        <td>Message:</td>
        <td class="second-column">{message}</td>
    </tr>

    </table>
    </main>
    <footer>
      <!-- Add your company info here -->
      <p>Ettore Mihaili</p>
      <p>Full Stack Developer</p>
      <p>+39 3459336804</p>
    </footer>
  </body>
</html>
`;
