let yourBlogs = [];

yourBlogsDiv = document.getElementById("yourBlogsDiv");

const addCard = () => {
	const newBlog = {
		id: `${Date.now()}`,
		url: document.getElementById("imageURL").value,
		title: document.getElementById("blogTitle").value,
		type: document.getElementById("blogCategory").value,
		content: document.getElementById("blogContent").value,
	};

	yourBlogsDiv.insertAdjacentHTML('afterbegin', generateCard(newBlog));

	yourBlogs.push(newBlog);
	saveToLocalStorage();
};

const generateCard = ({id, url, title, type, content}) => 
	`<div id=${id} class="col-md-6 col-lg-4 mt-4">
		<div class="card" key=${id}>
			<div class="card-header">
				<div class="d-flex justify-content-end">
					<button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
						<i class="fas fa-pencil-alt"></i>
					</button>
					<button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
						<i class="fas fa-trash-alt"></i>
					</button>
				</div>
			</div>
			<img src="${url || "http://driverphotoblog.net/wp-content/uploads/2020/10/Blogging-for-Small-Business-Owners.jpg"}" class="card-img-top" alt="image">
			<div class="card-body">
				<h5 class="card-title">${title}</h5>
				<p class="card-text">${content}</p>
				<p class="badge bg-primary">${type}</p>
			</div>
			<div class="card-footer">
				<button type="button" class="btn btn-outline-primary float-end" data-bs-target="#readMore" data-bs-toggle="modal" onclick="openBlogModal(this)" name=${id}>Read More</button>
			</div>
		</div>
	</div>`


const saveToLocalStorage = () => {
	localStorage.setItem("bloggy", JSON.stringify({blogs: yourBlogs}));
};

const reloadBlogCards = () => {
	const localStorageCopy = JSON.parse(localStorage.getItem("bloggy"));
	if(localStorageCopy) {
		yourBlogs = localStorageCopy.blogs;
	}
	yourBlogs.map((blog) => {
		yourBlogsDiv.insertAdjacentHTML('afterbegin', generateCard(blog));
	});
};

const deleteTask = (e) => {
	const targetID = e.getAttribute("name");
	yourBlogs = yourBlogs.filter((blog) => blog.id!==targetID);
	saveToLocalStorage();
	window.location.reload();
};

const editTask = (e) => {
	const targetID = e.getAttribute("name");
	e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");
	e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");
	e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true");
	e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes";
	e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEdits(this)");
	e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("name", targetID);
	e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("data-bs-target", "");
};

const saveEdits = (e) => {
	const targetID = e.getAttribute("name");
	const updatedBlog = {
		id: targetID,
		url: document.getElementsByTagName("img")[0].getAttribute("src"),
		title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
		type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
		content: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
	};
	yourBlogs = yourBlogs.map((blog) => (blog.id === targetID) ? updatedBlog : blog);
	saveToLocalStorage();
	window.location.reload();

	e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "false");
	e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "false");
	e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "false");
	e.innerHTML = "Read More";
	e.setAttribute("onclick", "openBlogModal(this)");
	e.setAttribute("data-bs-target", "#readMore");
};

const generateBlogModal = ({id, url, title, type, content}) => {
	const date = new Date(parseInt(id));
	return `<div id=${id}>
		<img src="${url || "https://previews.123rf.com/images/underverse/underverse1506/underverse150600803/41162151-task-word-on-notes-paper-with-cork-background-.jpg"}" alt="image" class="w-100">
		<strong class="text-sm text-muted">Written on ${date.toDateString()}</strong>
		<div class="d-flex justify-content-between align-items-center align-content-center">
			<h5 class="modal-title">${title}</h5>
			<p class="badge bg-primary mt-3">${type}</p>
		</div>
		<p class="modal-body">${content}</p>
	</div>`;
};

const openBlogModal = (e) => {
	const targetID = e.getAttribute("name");
	const targetCard = yourBlogs.filter((blog) => blog.id == targetID);
	document.getElementById("read__more__modal").innerHTML = generateBlogModal(targetCard[0]);
};

const searchBlog = (e) => {
	if (!e) e = window.event;
	while (blogs.firstChild) {
		blogs.removeChild(blogs.firstChild);
	}

	const resultData = yourBlogs.filter(({title}) =>
		title.includes(e.target.value)
	);

	resultData.map((blog) => {
		yourBlogsDiv.insertAdjacentHTML("afterbegin", generateCard(blog));
	});
};