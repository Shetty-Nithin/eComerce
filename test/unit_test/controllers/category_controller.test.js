const categoryController = require("../../../controllers/category_controller");
const {mockRequest, mockResponse} = require("../interceptor");
const newCategoryData = require("../mockData/newCategoryData.json");

const Models = require("../../../models");
const Category = Models.category;


beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
});

describe("<--- testing category creation method --->", () => {

    beforeEach(() => {
        req.body = newCategoryData;
    })

    it("should create a new category in db and return the response", async() => {
        const spyOnCreate = jest.spyOn(Category, 'create').mockImplementation((newCategoryData) => Promise.resolve(newCategoryData));

        await categoryController.create(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalledWith(newCategoryData);
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(201);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(newCategoryData);
    });

    it("error while creating the category", async() => {
        const spyOnCreate = jest.spyOn(Category, 'create').mockImplementation((newCategoryData) => Promise.reject(Error("this is an error")));

        await categoryController.create(req, res);

        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({
            message : "Its not you, its us."
        });
    })
})

describe("<--- testing the category updation mathod -->", () => {

    beforeEach(() => {
        req.body = newCategoryData;
        req.params = {
            id : 1
        }
    })

    it("should update the existing category and return the response", async() => {
        const spyOnUpdate = jest.spyOn(Category, 'update').mockImplementation((newCategoryData) => Promise.resolve(newCategoryData));

        await categoryController.update(req, res);

        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })

    it("error while updating the category", async() => {
        const spyOnUpdate = jest.spyOn(Category, 'update').mockImplementation(() => Promise.reject());

        await categoryController.update(req, res);

        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(Category.update).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({message : "Its not you, its us."});
    })
})

describe("<--- testing the category findOne mathod -->", () => {

    beforeEach(() => {
        req.params = {
            id : 1
        }
    })

    it("should find the category and return the response", async() => {
        const spyOnFindByPk = jest.spyOn(Category, 'findByPk').mockImplementation(() => Promise.resolve(newCategoryData));

        await categoryController.findCateg(req, res);

        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })

    it("error while finding the category", async() => {
        const spyOnFindByPk = jest.spyOn(Category, 'findByPk').mockImplementation(() => Promise.reject());

        await categoryController.findCateg(req, res);

        await expect(spyOnFindByPk).toHaveBeenCalled();
        await expect(Category.findByPk).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({message : "1 is not present in the database"});
    })
})

describe("<--- testing the category delete mathod -->", () => {

    beforeEach(() => {
        req.params = {
            id : 1
        }
    })

    it("should delete the category", async() => {
        const spyOndeleteCateg = jest.spyOn(Category, 'destroy').mockImplementation(() => Promise.resolve("successfully deleted"));

        await categoryController.deleteCateg(req, res);

        await expect(spyOndeleteCateg).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith("successfully deleted");
    })

    it("error while deleting the category", async() => {
        const spyOndeleteCateg = jest.spyOn(Category, 'destroy').mockImplementation(() => Promise.reject());

        await categoryController.deleteCateg(req, res);

        await expect(spyOndeleteCateg).toHaveBeenCalled();
        await expect(Category.destroy).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({message : "Its not you, its us."});
    })
})

describe("<--- testing the category findOne mathod -->", () => {

    it("should find all the category with no query and return the response", async() => {
        const spyOnFindAll = jest.spyOn(Category, 'findAll').mockImplementation(() => Promise.resolve(newCategoryData));

        await categoryController.findAllCateg(req, res);

        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })

    it("should find all the category with query and return the response", async() => {
        req.query = {
            name : "electronics"
        }
        const queryParam = {
            where : {
                name : "electronics"
            }
        }

        const spyOnFindAll = jest.spyOn(Category, 'findAll').mockImplementation((queryParam) => Promise.resolve(newCategoryData));

        await categoryController.findAllCateg(req, res);

        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalledWith(queryParam);
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(200);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith(newCategoryData);
    })

    it("error while finding all the category", async() => {
        const spyOnFindAll = jest.spyOn(Category, 'findAll').mockImplementation(() => Promise.reject(Error("this is an error")));

        await categoryController.findAllCateg(req, res);

        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(Category.findAll).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalled();
        await expect(res.status).toHaveBeenCalledWith(500);
        await expect(res.send).toHaveBeenCalled();
        await expect(res.send).toHaveBeenCalledWith({message : "this is not you, its us."});
    })
})