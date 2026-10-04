

        // ================= SIGN UP =================

        function signup() {

            let name = document.getElementById("signupName").value.trim();
            let email = document.getElementById("signupEmail").value.trim();
            let password = document.getElementById("signupPassword").value.trim();

            let message = document.getElementById("signupMessage");

            if (name === "" || email === "" || password === "") {

                message.innerHTML = "Please fill all fields.";
                message.style.color = "red";

                return;
            }

            if (password.length < 6) {

                message.innerHTML = "Password must be at least 6 characters.";
                message.style.color = "red";

                return;
            }

            let user = {
                name: name,
                email: email,
                password: password
            };

            // Save user in LocalStorage
            localStorage.setItem("user", JSON.stringify(user));

            message.innerHTML = "Account created successfully!";
            message.style.color = "green";

            // Clear inputs
            document.getElementById("signupName").value = "";
            document.getElementById("signupEmail").value = "";
            document.getElementById("signupPassword").value = "";

            // Go to Login
            setTimeout(function () {
                showLogin();
            }, 1000);
        }


        // ================= SHOW LOGIN =================

        function showLogin() {

            document.getElementById("signupPage").style.display = "none";
            document.getElementById("loginPage").style.display = "block";
            document.getElementById("welcomePage").style.display = "none";

        }


        // ================= SHOW SIGNUP =================

        function showSignup() {

            document.getElementById("signupPage").style.display = "block";
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("welcomePage").style.display = "none";

        }


        // ================= LOGIN =================

        function login() {

            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value.trim();

            let message = document.getElementById("loginMessage");

            let savedUser = localStorage.getItem("user");

            if (savedUser === null) {

                message.innerHTML = "Please create an account first.";
                message.style.color = "red";

                return;
            }

            let user = JSON.parse(savedUser);

            if (email === user.email && password === user.password) {

                // Login status
                localStorage.setItem("isLoggedIn", "true");

                openWelcome();

            } else {

                message.innerHTML = "Invalid email or password.";
                message.style.color = "red";

            }
        }


        // ================= WELCOME =================

        function openWelcome() {

            let savedUser = localStorage.getItem("user");

            if (savedUser) {

                let user = JSON.parse(savedUser);

                document.getElementById("welcomeName").innerHTML =
                    user.name;

            }

            document.getElementById("signupPage").style.display = "none";
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("welcomePage").style.display = "block";

        }


        // ================= LOGOUT =================

        function logout() {

            localStorage.removeItem("isLoggedIn");

            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";

            showLogin();

        }


        // ================= PAGE LOAD =================

        window.onload = function () {

            let loggedIn = localStorage.getItem("isLoggedIn");

            if (loggedIn === "true") {

                openWelcome();

            } else {

                // First page = Create Account
                showSignup();

            }

        };

 
