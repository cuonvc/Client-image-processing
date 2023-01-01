uploadImage();
searchingImage();

function uploadImage() {
    var uploadUrl = "http://localhost:5000/image-process/upload";
    var imageInput = document.querySelector("#file-image-upload");
    console.log(imageInput);

    imageInput.addEventListener("change", () => {

        var formData = new FormData();
        formData.append("image", imageInput.files[0]);

        var requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(uploadUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            alert("Đã upload một ảnh mới vào database");
            location.reload();
        })
        .catch(error => alert("Không thể upload ảnh: " + error));

    });
}

function searchingImage() {
    var uploadUrl = "http://localhost:5000/image-process/searching";
    var imageInput = document.querySelector("#file-image-select");
    console.log(imageInput);

    imageInput.addEventListener("change", () => {

        var formData = new FormData();
        formData.append("image", imageInput.files[0]);

        var requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow"
        };

        fetch(uploadUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
        .catch(error => alert("Không thể upload ảnh: " + error));

    });
}