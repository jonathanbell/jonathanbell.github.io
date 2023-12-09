---
title: Connecting PHP to LDAP
description: If I'm being honest, connecting PHP to LDAP was a little frustrating
publishDate: 2017-02-20
layout: ../../layouts/Post.astro
---

## How to Connect PHP to LDAP

The other day I needed to connect PHP to my organization's LDAP/Active Directory
server. I hadn't done this before and found it pretty difficult/annoying.

Hopefully, this will help someone else in the future or even just me in the
future (if I have to do the same thing again). I've heavily commented the code
below for clarity. The LDAP driver will need to be installed on your PHP server.

For the purpose of a simple example, we are sending an HTML form to the browser
that asks for the LDAP credentials. If we do not have any relevant `$_POST`
values, we output the form. Otherwise, on form submit, we will attempt to login
to the LDAP server with the credentials provided and retrieve some of the user's
information.

Now that we are logged in, we can use our LDAP session to perform operations
such as checking if the user is part of a certain group or has certain value(s)
associated with their account, etc.

```php
<?php

// Check if we have $_POST values.
// If we do, use them to attempt to authenticate with the LDAP server.
if(isset($_POST['username']) && isset($_POST['password'])) {

    $ldap = ldap_connect('ldap://your.ldap.domain'); // Ex. `idir.bcgov`
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Replace `idir` with your own organization's user domain.
    $ldaprdn = 'idir'.'\\'.$username;

    // I found these LDAP options worked the best with my organization's
    // server. Your milage will vary.
    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

    $bind = @ldap_bind($ldap, $ldaprdn, $password);

    // Check if we have a connection.
    // Did our LDAP connection get established with the credentials provided?
    // If not, perhaps the credentials are incorrect.
    if ($bind) {
        // Lookup a common LDAP value.
        $filter = "(sAMAccountName=$username)";
        // Replace `DC=idir,DC=BCGOV` with the LDAP "directory" that you want
        // to use for your query.
        $result = ldap_search($ldap, "DC=idir,DC=BCGOV", $filter);
        // Sort the returned results from Active Directory.
        ldap_sort($ldap, $result, "sn");
        // The user's info/data. `ldap_get_entries()` provided by your LDAP
        // PHP driver.
        $ldap_entries = ldap_get_entries($ldap, $result);

        for ($i = 0; $i < $ldap_entries["count"]; $i++) {
            if ($ldap_entries['count'] > 1) {
                break;
            }

            echo "You are accessing the user: "
                . $ldap_entries[$i]["sn"][0]
                . ", "
                . $ldap_entries[$i]["givenname"][0]
                . " (samaccountname: "
                . $ldap_entries[$i]["samaccountname"][0].")"
                . PHP_EOL
            ;

            // Debugging...
            // echo '<pre>';
            //     var_dump($ldap_entries);
            // echo '</pre>';

            // Example: A common LDAP value (`distinguishedname`).
            $userDn = $ldap_entries[$i]["distinguishedname"][0];
        }

        // Just for kicks, output all of the returned entries.
        print_r($ldap_entries);

        // Close the connection to LDAP.
        @ldap_close($ldap);

    } else {
        // Our credentials did not validate.
        echo "Invalid email address / password";
    }

} else {

?>
    <!-- No $_POST username and password values sent so output the form. -->
    <form action="#" method="POST">
        <label for="username">Username: </label>
        <input id="username" type="text" name="username" />

        <label for="password">Password: </label>
        <input id="password" type="password" name="password" />

        <input type="submit" name="submit" value="Submit" />
    </form>
<?php } ?>
```
