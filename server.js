const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Article = require("./models/blogSchema");
const app = express();

mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => {
        console.log("connection successful");
    }).catch((e) => {
        console.log(err);
    })

const hbs = require("hbs");
const port = process.env.PORT || 3000;
const path = require("path");
const articleRouter = require("./routes/articles");
app.set("view engine", 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

hbs.registerPartials(path.join(__dirname, "./views/articles/"));

hbs.registerHelper("dateFormat", function (timestamp) {
    return new Date(timestamp).toLocaleDateString('en-us', { hour: 'numeric', minute: 'numeric' })
});

app.get("/", async (req, res) => {
    const article = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { article: article });
})
app.use("/articles", articleRouter);

app.listen(port);