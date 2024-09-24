import productsManager from "../data/memory/products.manager.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }

    if (response.length > 0) {
      return res
        .status(200)
        .json({ message: "ALL OUR PRODUCTS", products: response });
    } else {
      const error = new Error("ERROR 404, CATEGORY NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function createGet(req, res, next) {
  try {
    const { title, category, price } = req.params;
    let { stock } = req.query;
    if (!stock) {
      stock = 0;
    }
    const response = await productsManager.create({
      title,
      category,
      price,
      stock,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.readId(pid);
    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    // Obtener el ID del producto
    const { pid } = req.params;
    // Obtener los datos de actualización del cuerpo de la solicitud 
    const updateData = req.body; 
    // Llamar al método update de productsManager
    const response = await productsManager.update(pid, updateData); 
    if (response) {
      return res.status(200).json({ message: "PRODUCT UPDATED", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    // Obtener el ID del producto
    const { pid } = req.params; 
    // Llamar al método delete de productsManager
    const response = await productsManager.delete(pid); 
    if (response) {
      return res.status(200).json({ message: "PRODUCT DELETED", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED", responseManager });
  } catch (error) {
    return next(error);
  }
}

export { getAllProducts, createGet, getProduct, update, deleteProduct, create };