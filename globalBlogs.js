const globalBlogs = [];
let i = 0

globalBlogsDiv = document.getElementById("globalBlogsDiv");

const blog1 = {
	id: `${Date.now() + ++i}`,
	url: "./assets/blogging.jpg",
	title: "Lorem Ipsum",
	type: "Science",
	content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}
globalBlogs.push(blog1);

const blog2 = {
	id: `${Date.now() + ++i}`,
	url: "./assets/blogging.jpg",
	title: "Lorem Ipsum 2",
	type: "Science",
	content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}
globalBlogs.push(blog2);

const blog3 = {
	id: `${Date.now() + ++i}`,
	url: "./assets/blogging.jpg",
	title: "Lorem Ipsum 3",
	type: "Science",
	content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}
globalBlogs.push(blog3);

const generateGlobalCards = ({ id, url, title, type, content }) =>
	`<div class="col-md-6 col-lg-4 mt-4" id=${id}>
		<div class="card">
			<img src="${url || "./assets/blogging.jpg"}" class="card-img-top" alt="image">
			<div class="card-body">
				<h5 class="card-title">${title}</h5>
				<p class="card-text text-truncate">${content}</p>
				<p class="badge bg-primary">${type}</p>
			</div>
			<div class="card-footer">
				<button type="button" class="btn btn-outline-primary float-end" data-bs-target="#readMore" data-bs-toggle="modal" onclick="readMore(this)" name=${id}>Read More</button>
			</div>
		</div>
	</div>`

const displayGlobalBlogs = () => globalBlogs.forEach((blog) => globalBlogsDiv.insertAdjacentHTML('afterbegin', generateGlobalCards(blog)))

const readMoreModal = ({ id, url, title, type, content }) => {
	return `<div id=${id}>
		<img src="${url || "https://previews.123rf.com/images/underverse/underverse1506/underverse150600803/41162151-task-word-on-notes-paper-with-cork-background-.jpg"}" alt="image" class="w-100">
		<div class="d-flex justify-content-between align-items-center">
			<h5 class="modal-title">${title}</h5>
			<p class="badge bg-primary mt-3">${type}</p>
		</div>
		<p class="modal-body">${content}</p>
	</div>`;
};

const readMore = (e) => {
	const targetID = e.getAttribute("name");
	const targetCard = globalBlogs.filter((blog) => blog.id == targetID);
	document.getElementById("read__more__modal").innerHTML = readMoreModal(targetCard[0]);
};