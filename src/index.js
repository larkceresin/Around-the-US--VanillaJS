
import {Card} from "./components/Card.js";
import {FormValidator} from "./components/FormValidator.js";
import {toggleModal} from "./utils/utils.js";
import {profilePopout, profileFormElement, nameInput,jobInput,profileCloseBtn,profile,nameOutput,jobOutput,editBtn,addButton,galleryPopout,galleryFormElement,galleryCloseBtn,titleInput,imageInput,galleryContainer,picturePopout, pictureCloseBtn, popoutImage, popoutTitle, initialCards, defaultConfig} from "./utils/constants.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";
import { data } from "autoprefixer";

const profileForm = new PopupWithForm({popupSelector:profilePopout, formSubmission: ()=> {
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    
    toggleModal(profilePopout);
    galleryForm.close()}})

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

const galleryForm = new PopupWithForm({popupSelector:galleryPopout, formSubmission: ()=> {
        const card = new Card ({data: galleryForm.inputValues, handleCardClick:()=>{
            const imagePopup = new PopupWithImage(picturePopout);
            imagePopup.open({link:data.link, name:data.name});} 
        }, "#gallery-object");
        cardList.addItem(card.generateCard());
        galleryForm.close()}})



editBtn.addEventListener("click", () => profileForm.open());
addButton.addEventListener("click", () => galleryForm.open());
