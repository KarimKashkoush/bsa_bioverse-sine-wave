let track = 'https://script.google.com/macros/s/AKfycbxeUOCfVhAHFbU_lS2MuwD9IFCzjEPqqiM4Pl8chNwcFuJqbsraeNPTn710PheMzMOn/exec'





// Start Validation form
let formContent = document.getElementById('form');
let nameArabic = document.getElementById('personalNameArabic');
let nameEnglish = document.getElementById('personalNameEnglish');
let unName = document.getElementById('university');
let unNameInput = document.getElementById('university-input');
let faName = document.getElementById('faculty');
let faNameInput = document.getElementById('faculty-input');
let majorName = document.getElementById('major');
let level = document.getElementById('level');
let phone = document.getElementById('phone');
let email = document.getElementById('email');
let nationaltynumber = document.getElementById('nationalty');
let nationaltyIdFrontImgFront = document.getElementById('nationaltyIdFront');
let nationaltyIdFrontImgBack = document.getElementById('nationaltyIdBack');
let time = document.getElementById('time');
let load = document.getElementById('loading-message')
let submit = false;


let nameArSub = false,
    nameEnSub = false,
    unNameSub = false,
    faNameSub = false,
    majorNameSub = false,
    levelSub = false,
    phoneSub = false,
    emailSub = false,
    nationaltynumberSub = false,
    nationaltyIdFrontSub = false,
    nationaltyIdBackSub = false

let setSucces = (ele) => {
    let parent = ele.parentElement
    let error = parent.querySelector(".error-massege")
    error.innerHTML = ""
    ele.classList.add("succes")
    ele.classList.remove("error")
    submit = true;
}

let setError = (ele, errorMa) => {
    let parent = ele.parentElement;
    let error = parent.querySelector(".error-massege")
    error.innerHTML = errorMa
    ele.classList.add("error")
    ele.classList.remove("succes")
    submit = false;
}

let another = (ele) => {
    let parent = ele.parentElement;
    let another = parent.querySelector(".input-hidden");
    another.classList.remove('hidden');
    another.value = '';
}

let anotherhidden = (ele) => {
    let parent = ele.parentElement;
    let another = parent.querySelector(".input-hidden");
    another.classList.add('hidden');
}


const form = document.forms['contact-form']
form.onsubmit = async (e) => {
    e.preventDefault();

    // تنفيذ جميع عمليات التحقق
    nameArCheck();
    nameEnCheck();
    universityCheck();
    faNameCheck();
    majorNameCheck();
    levelCheck();
    phoneCheck();
    emailCheck();
    nationaltynumberCheck();
    nationaltyIdFrontImgFrontCheck();
    nationaltyIdFrontImgBackCheck();

    if (nameArSub == true && nameEnSub == true && unNameSub == true && faNameSub == true && majorNameSub == true && levelSub == true && phoneSub == true && emailSub == true && nationaltynumberSub == true && nationaltyIdFrontSub == true && nationaltyIdBackSub == true) {
        // ضبط الوقت الحالي
        const now = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDateTime = now.toLocaleString('ar-EG', options);
        time.value = formattedDateTime;

        // إعداد عنوان URL
        const scriptURL = track;

        // عرض مؤشر التحميل
        load.style.display = "flex";

        try {
            // إرسال البيانات عبر fetch
            await fetch(scriptURL, { method: 'POST', body: new FormData(form) });

            // الانتظار 5 ثواني لإخفاء مؤشر التحميل
            await new Promise(resolve => setTimeout(resolve, 3000));
            load.style.display = "none";

            // عرض رسالة النجاح
            await Swal.fire({
                position: "center-center",
                icon: "success",
                title: "تم تسجيل بياناتك بنجاح",
                showConfirmButton: false,
                timer: 2500
            });

            // إعادة تحميل الصفحة بعد عرض الرسالة
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.error('Error!', error.message);
        }
    }
};

// check name in arabic
function nameArCheck() {
    if (nameArabic.value.trim() == "") {
        setError(nameArabic, "الاسم مطلوب")
        nameArSub = false;
    } else if (nameArabic.value.trim().length < 6) {
        setError(nameArabic, "يجب كتابة الاسم بشكل صحيح وكامل")
        nameArSub = false;
    } else {
        setSucces(nameArabic)
        nameArSub = true;
    }
}
nameArabic.oninput = () => {
    nameArCheck()
}
// check name in english
function nameEnCheck() {
    if (nameEnglish.value.trim() == "") {
        nameEnSub = false;
        setError(nameEnglish, "الاسم مطلوب")
    } else if (nameEnglish.value.trim().length < 6) {
        nameEnSub = false;
        setError(nameEnglish, "يجب كتابة الاسم بشكل صحيح وكامل")
    } else {
        nameEnSub = true;
        setSucces(nameEnglish)
    }
}
nameEnglish.oninput = () => {
    nameEnCheck()
}

// الجــــــــامعة
let imgFront = nationaltyIdFrontImgFront.parentElement;
let imgBack = nationaltyIdFrontImgBack.parentElement;
let nationalityId = nationaltynumber.parentElement;
unName.onchange = () => {
    if (unName.value == "أخري") {
        unNameInput.value = "";
        unNameInput.classList.remove('hidden');

        nationaltynumber.value = "";
        nationaltyIdFrontImgFront.value = "";
        nationaltyIdFrontImgBack.value = "";

        imgFront.classList.remove('hidden');
        imgBack.classList.remove('hidden');
        nationalityId.classList.remove('hidden');

    } else if (unName.value != "جامعة المنصورة" && unName.value != "أخري" && unName.value != "الجامعة") {
        unNameInput.classList.add('hidden');
        unNameInput.value = unName.value;
        nationaltynumber.value = "";
        nationaltyIdFrontImgFront.value = "";
        nationaltyIdFrontImgBack.value = "";

        imgFront.classList.remove('hidden');
        imgBack.classList.remove('hidden');
        nationalityId.classList.remove('hidden');

    } else if (unName.value == "الجامعة") {
        unNameInput.value = "";
        unNameInput.classList.add('hidden');

        nationaltynumber.value = "";
        nationaltyIdFrontImgFront.value = "";
        nationaltyIdFrontImgBack.value = "";

        nationalityId.classList.add('hidden')
        imgFront.classList.add('hidden');
        imgBack.classList.add('hidden');
    } else {
        unNameInput.classList.add('hidden');
        unNameInput.value = unName.value;

        nationaltynumber.value = "00000000000000"
        nationaltyIdFrontImgFront.value = "https://drive.google.com/file/d/1TavvchrOZTo6uhLhH=drive_link";
        nationaltyIdFrontImgBack.value = "https://drive.google.com/file/d/1TavvchrOZTo6uhLhH=drive_link";

        nationalityId.classList.add('hidden')
        imgFront.classList.add('hidden');
        imgBack.classList.add('hidden');
    }
}
function universityCheck() {
    if (unNameInput.value == "" || unName.value == "الجامعة") {
        unNameSub = false
        setError(unName, "اسم الجامعة مطلوب")
        unNameSub = false
    } else if (unName.value == "أخري" && unNameInput.value.trim().length >= 3) {
        setSucces(unName)
        unNameSub = true
    } else if (unName.value != "أخري") {
        unNameSub = true
        setSucces(unName)
    }
}
unName.onblur = () => {
    universityCheck()
}
unNameInput.onblur = () => {
    universityCheck()
}


// الكــــــلية
faName.onchange = () => {
    faNameInput.value = faName.value;

    if (faName.value == "اخري") {
        faNameInput.value = "";
        faNameInput.classList.remove('hidden');
    } else {
        faNameInput.value = faName.value;
        faNameInput.classList.add('hidden');
    }
}

function faNameCheck() {
    if (faNameInput.value == "" || faName.value == "الكلية") {
        faNameSub = false;
        setError(faName, "اسم الكلية مطلوب")
    } else if (faName.value != "أخري") {
        faNameSub = true;
        setSucces(faName)
    } else if (faName.value == "أخري" && faNameInput.value.trim().length >= 3) {
        faNameSub = true;
        setSucces(faName)
    }
}

faName.onblur = () => {
    faNameCheck()
}
faNameInput.onblur = () => {
    faNameCheck()
}


// القــســـم
function majorNameCheck() {
    if (majorName.value != "الهندسة الطبية") {
        majorNameSub = false;
        setError(majorName, "اسم القسم مطلوب")
    } else {
        majorNameSub = true;
        setSucces(majorName)
    }
}
majorName.onblur = () => {
    majorNameCheck()
}

// Check level 
function levelCheck() {
    if (level.value == "المستوي") {
        levelSub = false;
        setError(level, "المستوى مطلوب")
    } else {
        levelSub = true;
        setSucces(level)
    }
}
level.oninput = () => {
    levelCheck()
}


// Phone
function isNumberKey(evt) {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
    }
}

// Function to validate the length of the phone number
function validatePhoneNumberLength(event) {
    const input = event.target;
    if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);
    }
}

// Add event listeners to the input element
phone.addEventListener('keypress', isNumberKey);
phone.addEventListener('input', validatePhoneNumberLength);

function phoneCheck() {
    if (phone.value.trim() == "") {
        phoneSub = false;
        setError(phone, "رقم الهاتف مطلوب")
    } else if (phone.value.trim().length < 11) {
        phoneSub = false;
        setError(phone, "رقم الهاتف يجب أن يكون 11 رقم")
    } else {
        phoneSub = true;
        setSucces(phone)
    }
}
phone.oninput = () => {
    phoneCheck()
}


// email 
function emailCheck() {
    if (email.value.trim() == "") {
        emailSub = false;
        setError(email, "البريد الإلكتروني مطلوب")
    } else if (email.value.trim().length < 5) {
        emailSub = false;
        setError(email, "يجب كتابة الايميل بشكل صحيح")
    } else {
        emailSub = true;
        setSucces(email)
    }
}
email.oninput = () => {
    emailCheck()
}
// email


// nationality id

function validateNationalityNumberLength(event) {
    const input = event.target;
    if (input.value.length > 14) {
        input.value = input.value.slice(0, 11);
    }
}

// Add event listeners to the input element
nationaltynumber.addEventListener('keypress', isNumberKey);
nationaltynumber.addEventListener('input', validateNationalityNumberLength);


function nationaltynumberCheck() {
    if (nationaltynumber.value.trim() == "") {
        nationaltynumberSub = false;
        setError(nationaltynumber, "رقم البطاقة (الاقامة) مطلوب")
    } else if (nationaltynumber.value.trim().length != 14) {
        nationaltynumberSub = false;
        setError(nationaltynumber, "أدخل الرقم بشكل صحيح")
    } else {
        nationaltynumberSub = true;
        setSucces(nationaltynumber)
    }
}

nationaltynumber.onchange = () => {
    nationaltynumberCheck()
}
// nationality id

// Links

// Function to validate the Google Drive link format
let validateDriveLinkFormat = (ele) => {
    const driveLinkPattern = /^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=|drive\/folders\/|drive\/u\/\d+\/folders\/)[\w-]+/;
    if (!driveLinkPattern.test(ele.value)) {
        setError(ele, "يجب ادخال لينك درايف صحيح");
    } else {
        setSucces(ele);
    }
}

// Add event listeners to the input elements
nationaltyIdFrontImgFront.addEventListener('input', () => validateDriveLinkFormat(nationaltyIdFrontImgFront));
nationaltyIdFrontImgBack.addEventListener('input', () => validateDriveLinkFormat(nationaltyIdFrontImgBack));

function nationaltyIdFrontImgFrontCheck() {
    if (nationaltyIdFrontImgFront.value.length <= 0) {
        setError(nationaltyIdFrontImgFront, 'من فضلك أدخل اللينك')
        nationaltyIdFrontSub = false;
    }
    else {
        nationaltyIdFrontSub = true;

    }
}
nationaltyIdFrontImgFront.oninput = () => {
    nationaltyIdFrontImgFrontCheck()
}

function nationaltyIdFrontImgBackCheck() {
    if (nationaltyIdFrontImgBack.value.length <= 0) {
        nationaltyIdBackSub = false
        setError(nationaltyIdFrontImgBack, 'من فضلك أدخل اللينك')
    } else {
        nationaltyIdBackSub = true
    }
}
nationaltyIdFrontImgBack.oninput = () => {
    nationaltyIdFrontImgBackCheck()
}




// End Validation form













































