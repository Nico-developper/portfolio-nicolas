import mongoose from "mongoose";
import slugify from "slugify";

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        description: { type: String, required: true },
        tech: [{ type: String, trim: true }],
        tags: [{ type: String, trim: true }],
        githubUrl: { type: String },
        demoUrl: { type: String },
        coverImage: { type: String },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

ProjectSchema.pre("save", function (next) {
    if (!this.slug && this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});
ProjectSchema.pre("insertMany", function (docs, next) {
    for (const d of docs) {
        if (!d.slug && d.title) {
            d.slug = slugify(d.title, { lower: true, strict: true });
        }
    }
    next();
});

export default mongoose.model("Project", ProjectSchema);
