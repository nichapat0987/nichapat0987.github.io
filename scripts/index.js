// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const Textburnedcal = document.querySelector('.total-burnedcal');
const Textrecord = document.querySelector('.record');
const Textusername = document.querySelector('.username');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then((doc) => {
      const html = `
        <div>Logged in as ${doc.data().username}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};


const Getcalburned = (user) => {
  if (user){
  db.collection('users').doc(user.uid).get().then((doc) => {

    const burn = {
      burnedcal : doc.data().burnedcal
    }
    localStorage.setItem("CurrentCal", JSON.stringify(burn));

    const burncaltext = `
      ${doc.data().burnedcal}
    `;
    Textburnedcal.innerHTML = burncaltext;
  });
  }
}




const GetUsername = (user) => {
  if (user){
  db.collection('users').doc(user.uid).get().then((doc) => {

    const username = {
      username : doc.data().username
    }
    localStorage.setItem("username", JSON.stringify(username));

    const usernametext = `
      ${doc.data().username}
    `;
    Textusername.innerHTML = usernametext;
  });
  }
}

const GetEmail = (user) => {
  if (user){
  db.collection('users').doc(user.uid).get().then((doc) => {

    const email = {
      email : doc.data().email
    }
    localStorage.setItem("email", JSON.stringify(email));
  });
  }
}

//After Burned
const UpdatedandSaveCal = (user) => {
  if (user) {
    AfterBurnedArray = JSON.parse(localStorage.getItem('AfterBurned'));
    AfterBurned = AfterBurnedArray.burnedcalupdate;
    UserweightArray = JSON.parse(localStorage.getItem('weight'));
    Userweight = UserweightArray.weight;
    UsernameArray = JSON.parse(localStorage.getItem('username'));
    Username = UsernameArray.username;
    EmailArray = JSON.parse(localStorage.getItem('email'));
    Email = EmailArray.email;
    db.collection('users').doc(user.uid).set({
      burnedcal: AfterBurned,
      username: Username,
      email: Email,
      weight: Userweight,
    });
    localStorage.removeItem('AfterBurned');
    localStorage.removeItem('CurrentCal');
    localStorage.removeItem('weight');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


