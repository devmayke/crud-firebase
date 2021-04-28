const formLogin = $(".form")
const email = $("#email")
const password = $("#password")
const login = $("#form-login")
const register = $("#form-register")
const constextLogin = $(".form-header")
const sectionLogin = $(".section-login")
const sectionToDo = $(".section-todo")
const visibilityHidden = $(".password-visibility-hidden")
const visibilityVisible = $(".password-visibility-visible")
const emailToDo = $(".section-todo-email")
const menuEmail = $(".menu-email")
const emailVerified = $(".email-verified")
const registering = $(".registering")
const forgotPassword = $("forgot-password")
const menuToggle = $(".menu-toggle-menu")
const checked = $("#check")
const showEditName = $(".edit-name")

const inputsLogin = [email, password]
inputsLogin.forEach((el)=>{
  el.addEventListener("focus", (e)=>{
    let attribute = e.target.getAttribute("id")
    console.log(attribute)
    if(attribute == "email"){
      document.querySelector(".email").style.color= "#006bff"
      document.querySelector(".password").style.color= "#adb4c4"
      document.querySelector(".password-visibility-hidden").style.color = "#adb4c4"   
    }
    if(attribute == "password"){
      document.querySelector(".password").style.color= "#006bff"
      document.querySelector(".password-visibility-hidden").style.color = "#006bff"
      document.querySelector(".email").style.color= "#adb4c4"
    }
  })
})
function $(value) {
  return document.querySelector(value)
}
register.addEventListener("click", modifyContextLogin)
function modifyContextLogin(e) {
  registering.innerText = "Cadastrando..."
}
function showItem(item) {
  item.style.display = "initial"
}
function hideItem(item) {
  item.style.display = "none"
}
async function logout() {
  console.log("btn logout")
  await firebase.auth().signOut()
  menuToggle.classList.remove("menu-show")
  checked.checked = false
  showAuth()
  localStorage.setItem("userTodo", "")
}

function passwordVisible(e) {
  let visible = password.getAttribute("type")
  if (visible == "password") {
    password.setAttribute("type", "text")
    hideItem(visibilityHidden)
    showItem(visibilityVisible)
    console.log(visible)
  }
  if (visible == "text") {
    password.setAttribute("type", "password")
    hideItem(visibilityVisible)
    showItem(visibilityHidden)
    console.log(visible)
  }
}
var actionCodeSettings = {
  url: "http://127.0.0.1:5500/"
}
async function toggleMenu(){  
  await menuToggle.classList.toggle("menu-show")
  if(menuToggle.classList.contains("menu-show")){    
    menuToggle.style.display = "flex"  
    await setTimeout(()=>{
      menuToggle.style.width = "80vw"
    }, 100)    
    document.querySelector(".menu-hide").style.opacity= "1"       
  }else{
    (async function(){
      await setTimeout(()=>{
        menuToggle.style.width = "0vw"
      }, 100)      
      // menuToggle.style.width = "0vw" 
      await setTimeout(()=>{
        hideItem(menuToggle)         
      }, 200) 
      document.querySelector(".menu-hide").style.opacity= "0"
      checked.checked = false
    })()    
  }  
}
function editName(){
showEditName.classList.toggle("show-edit-name")
menuHide()   
}
function editNameField(){  
  let name = $("#edit-name-field")
  let user = firebase.auth().currentUser
  if(name.value != ""){
    user.updateProfile({
      displayName:name.value,
      photoURL:""
    })
  }
  editName()
  menuEmail.innerText = name.value
  showEditName.value=""  
}
function menuHide(){
  if (checked.checked == true){
    (async function(){
      console.log("clicou")
      await setTimeout(()=>{
        menuToggle.style.width = "0vw"
      }, 100)      
      // menuToggle.style.width = "0vw" 
      await setTimeout(()=>{
        hideItem(menuToggle)         
      }, 200) 
      document.querySelector(".menu-hide").style.opacity= "0"
      checked.checked = false 
      menuToggle.classList.remove("menu-show")    
    })() 
  } 
}

