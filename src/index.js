
import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js";
import {profilePopout, profileFormElement, nameInput, jobInput, nameOutput, jobOutput, editBtn,addButton,galleryPopout,galleryFormElement,titleInput,imageInput,galleryContainer,picturePopout, initialCards, defaultConfig} from "./utils/constants.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";
import { data } from "autoprefixer";


const profileValidator = new FormValidator(defaultConfig, profileFormElement);
const galleryValidator = new FormValidator(defaultConfig, galleryFormElement);
profileValidator.enableValidation();
galleryValidator.enableValidation();

const cardList = new Section({
    items: initialCards,
    renderer: (data)=> { 
        const card = new Card ({
            data, handleCardClick:()=>{
                const imagePopup = new PopupWithImage(picturePopout);
                imagePopup.open({data});} 
            }, "#gallery-object")
            cardList.addItem(card.generateCard());
        }, 
        
}, galleryContainer)
cardList.renderer();

const profileForm = new PopupWithForm({popupSelector:profilePopout, formSubmission: ()=> {
    const profileInfo = new UserInfo(".popout__form-input_type_name", ".popout__form-input_type_job");
    profileInfo.setUserInfo();
    profileValidator.enableValidation()}});


const galleryForm = new PopupWithForm({popupSelector:galleryPopout, formSubmission: ()=> {
        const newCard = new Card ({data:{name: titleInput.value, link: imageInput.value}, handleCardClick:(data)=>{
            const imagePopup = new PopupWithImage(picturePopout);
            imagePopup.open({data});} 
        }, "#gallery-object");
        cardList.addItem(newCard.generateCard());
        galleryValidator.enableValidation()}})



editBtn.addEventListener("click", () => {
    profileForm.open();
 const formValue = new UserInfo(".profile__name", ".profile__profession");
 formValue.getUserInfo();
 profileValidator.enableValidation;
});
addButton.addEventListener("click", () => galleryForm.open());
