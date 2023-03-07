const loginFormHandler = async () => {

    const email = document.querySelector('#email').value.trim();
    console.log(email)
    const password = document.querySelector('#password').value.trim();
    console.log(password)
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
  
      if (response.ok) {
        document.location.replace('/journal');
      } else {
        console.log('Wrong email or password');
      }
    }
  };
  
  document
    .querySelector('#signIn')
    .addEventListener('submit', loginFormHandler);

    function emptyDiv() {
      document.querySelector(".main").innerHTML = " "
    }
  
    function signUpCard() {
      emptyDiv();
      document.querySelector(
        ".main"
      ).innerHTML += `<p class="sign" align="center">Sign Up</p>
      <form class="form1" id="signUp">
        <input class="un " type="text" align="center" placeholder="Username" id="name">
        <input class="email" type="text" align="center" placeholder="Email" id="email">
        <input class="pass" type="password" align="center" placeholder="Password" id="password">
        <a class="submit" align="center" type="submit" onclick="signUp()">Sign Up</a>`
    }

      const signUp = async (event) => {
    
      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
    
      if (name && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),  
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/journal');
        } else {
          alert('Failed to sign up.');
        }
      }
    };