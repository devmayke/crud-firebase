firebase.auth().lenguageCode = "pt-BR"
formLogin.onsubmit = (e) => {
  e.preventDefault()
  if (registering.innerText !== "Cadastrando...") {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        hideItem(menuToggle)
        showAuth()
      })
      .catch((err) => {
        console.log("Falha no acesso")
        console.log(err.message)
      })
  } else {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((user) => {
        registering.innerText = "Login"
        console.log("Usuário criado com sucesso")
        console.log(user)
        firebase.auth().signOut()
      })
      .catch((err) => {
        console.log("Falha ao criar usuário")
        console.log(err.message)
      })
      .finally(() => {
        email.value = ""
        password.value = ""
      })
  }
}
window.document.body.onload = () => {
  console.log(localStorage.getItem("userTodo"))
  if (localStorage.getItem("userTodo") !== "" && localStorage.getItem("userTodo") !== undefined) {
    hideItem(sectionLogin)
    hideItem(menuToggle)
    showItem(sectionToDo)
  }
}
async function showAuth() {
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      localStorage.setItem("userTodo", user.email)
      console.log("Usuário autenticado")
      hideItem(sectionLogin)
      showItem(sectionToDo)
      if (user.displayName == null) {
        menuEmail.innerText = user.email
      } else {
        menuEmail.innerText = user.displayName
      }
      if (user.photoURL == null || user.photoURL == "") {
        document.querySelector(".img-perfil-avatar").style.display = "flex"
        hideItem(document.querySelector(".img-perfil"))
      } else {
        hideItem(document.querySelector(".img-perfil-avatar"))
        let img = document.querySelector(".img-perfil")
        img.setAttribute("src", user.photoURL)
        img.style.display = "flex"
      }
      console.log(user.email)
      // if (!user.emailVerified) {
      //   emailVerified.style.display = "initial"
      // } else {
      //   emailVerified.style.display = "none"
      // }
    } else {
      console.log("Usuário não autenticado")
      hideItem(sectionToDo)
      showItem(sectionLogin)
    }
  })
}
function sendEmailVerification() {
  let user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSettings)
    .then(() => {
      console.log("Email de verificação enviado para " + user.email)
    })
    .catch((err) => {
      console.log("Erro ao enviar email de verificação")
    })
}
function sendPasswordResetEmail() {
  if (email.value !== "") {
    firebase.auth().sendPasswordResetEmail(email.value, actionCodeSettings)
      .then(() => {
        console.log("Email de redefinição de senha enviado para " + email.value)
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        email.value = ""
        password.value = ""
      })
  } else {
    alert("Preencha o campo 'email'")
  }
}
function signInWithGoogle() {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => {
      hideItem(menuToggle)
      showAuth()
    })
    .catch(err => {
      console.log(err)
    })
}
function signInWithGitHub() {
  firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(() => {
      hideItem(menuToggle)
      showAuth()
    })
    .catch(err => {
      console.log(err)
    })
}
function signInWithFacebook() {
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(() => {
      hideItem(menuToggle)
      showAuth()
    })
    .catch(err => {
      console.log(err)
    })
}






