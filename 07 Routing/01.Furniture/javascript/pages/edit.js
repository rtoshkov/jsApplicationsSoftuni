import {html} from '../libs.js';
import {editFurniture, furnitureByID} from "../api.js";

const editTemplate = (onSubmit, item, err = undefined)=> html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control ${err && err['make'] ? 'is-invalid' : '' }" id="new-make" type="text" name="make" .value=${item.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control ${err && err['model'] ? 'is-invalid' : '' }" id="new-model" type="text" name="model" .value=${item.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control ${err && err['year'] ? 'is-invalid' : '' }" id="new-year" type="number" name="year" .value=${item.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control ${err && err['description'] ? 'is-invalid' : '' }" id="new-description" type="text" name="description" .value=${item.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control ${err && err['price'] ? 'is-invalid' : '' }" id="new-price" type="number" name="price" .value=${item.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control ${err && err['img'] ? 'is-invalid' : '' }" id="new-image" type="text" name="img" .value=${item.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control ${err && err['material'] ? 'is-invalid' : '' }" id="new-material" type="text" name="material" .value=${item.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>`


export async function displayEdit(ctx){
    const item = await furnitureByID(ctx.params.id);
    ctx.render(editTemplate(onSubmit, item));
    const context = ctx;



    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const emptyFields = [...formData].filter(([key,value]) => value === '' && key !== 'material');
        const err = {};

        const make = formData.get('make');
        const model = formData.get('model');
        const year = formData.get('year');
        const description = formData.get('description');
        const price = formData.get('price');
        const img = formData.get('img');
        const material = formData.get('material');


        if(emptyFields.length > 0){
            emptyFields.forEach((item) => {
                err[item[0]] = true;
            })
            console.log(err);
            alert('Pls fill out all required fields');
            context.render(editTemplate(onSubmit, item, err));
            return
        }






        const data = {
            make,
            model,
            year,
            description,
            price,
            img,
            material,
        }

        await editFurniture(data, item._id);
        context.updateNav();
        context.page.redirect('/');
    }
}