const loginFormHandler = async () => {
  
    console.log("hello")
  
    const userName = document.querySelector('#username').value.trim();
    console.log(userName)
    const password = document.querySelector('#password').value.trim();
    console.log(password)
    if (userName && password) {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/journal');
      } else {
        console.log('Wrong user name or password');
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

  
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }), // 
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/journal');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  // document
  //   .querySelector('#signIn')
  //   .addEventListener('submit', loginFormHandler);
  
  // document
  //   .querySelector('#signUp')
  //   .addEventListener('submit', signupFormHandler);

    function emptyDiv() {
      document.querySelector(".main").innerHTML = " "
    }
  
    function signUp() {
      emptyDiv();
      document.querySelector(
        ".main"
      ).innerHTML += `<p class="sign" align="center">Sign Up</p>
      <form class="form1" id="signUp">
        <input class="un " type="text" align="center" placeholder="Username" id="username">
        <input class="email" type="text" align="center" placeholder="Email@email.com" id="email">
        <input class="pass" type="password" align="center" placeholder="Password" id="password">
        <a class="submit" align="center" type="submit">Sign Up</a>`
    }

    function test() {
      console.log('button clicked')
    }

    document.querySelector('.signUp').addEventListener('submit', test)