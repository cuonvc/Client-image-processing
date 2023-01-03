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

        document.querySelector(".main-quote").innerHTML = `<h1>Loading...</h1>`;

        fetch(uploadUrl, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            var content = "";
            var countMatching = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i] != "Vui lòng chọn ảnh màu và đúng định dạng '.png'") {
                    const imageBase64 = result[i][1];
                    const src = 'data:image/png;base64,' + imageBase64;
                    const imageContent = `
                        <div class="content-image-item">
                            <img class="image-item" src="${src}" alt="">
                        </div>
                    `
                    content += imageContent;
                    countMatching++;
                }
            }
            
            var title = document.querySelector(".main-quote")
            document.querySelector(".content-image-list").innerHTML = content;
            if (content == "") {
                title.innerHTML = `<h1>Oops... Không có kết quả :((</h1>`;
            } else {
                title.innerHTML = `<h1>Tìm thấy ${countMatching} kết quả tương tự</h1>`;
            }
        })
        .catch(error => alert("Không thể upload ảnh: " + error));

    });
}