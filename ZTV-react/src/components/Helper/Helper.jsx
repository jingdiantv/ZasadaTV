import { request } from "../MyAxios/MyAxios";

export const applHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

export const fillSpaces = (event) =>{
    if(event.includes(" "))
        return event.replaceAll(" ", "-");
    return event;
}

export const unFillSpaces = (event) =>{
    if(event.includes("-"))
        return event.replaceAll("-", " ");
    return event;
}

export const fillDots = (event) =>{
    if(event.includes("."))
        return event.replaceAll(".", "-");
    return event;
}


export const matchUrlMaker = (id, left, right, event, date) =>{
    return id + "/" + fillSpaces(left) + "-"  + fillSpaces(right) + "-" + fillSpaces(event) + "-" + fillDots(date);
}


export function getElemByValue(arr, value, key) {
    for (let i = 0; i < arr.length; ++i){
        if (arr[i][key] === value){
            return i;
        }
    }
}


export function getImg(setImg, id, type="/type") {
    request("GET", "/getImage/" + id + type, {}, {"Content-Type": "image/jpeg"}, "blob").then((resp) => {
        setImg(URL.createObjectURL(resp.data));
    });
}


export function getListImgText(endPoint, type, key, setImg){
    request("GET", endPoint, {}, applHeaders).then((resp) => {
        resp.data.map((item) =>{
            request("GET", "/getImage/" + item[key] + type, {}, {"Content-Type": "image/jpeg"}, "blob").then((response) =>{
                let temp = resp.data;
                temp[getElemByValue(temp, item[key], key)]["src"] = URL.createObjectURL(response.data);
                setImg(temp);
            });
        });
    });
}


export const onImageUploaded = (event, type, setImage, id) => {
    let file = event.target.files[0];
    if (file !== null && file !== "null" && file !== "undefined"){
        const image = new FormData();
        image.append('imageFile', file);
        image.append('imageName', file.name);
        image.append("type", type);
        image.append("id", id);
        setImage(URL.createObjectURL(file));
        request("POST", "/uploadImage", image, {"Content-Type": "multi-part/formdata"});
    }
}