const mongoose = require("mongoose");
const Category = require("./../models/category");
const express = require("express");
const { validationResult } = require("express-validator");

exports.show_category = (request, response, next) => {
  Category.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// exports.delete_category = (request, response, next) => {
//   let errors = validationResult(request);
//   if (!errors.isEmpty()) {
//     let error = new Error();
//     error.status = 422;
//     error.message = errors
//       .array()
//       .reduce((current, object) => current + object.msg + " ", "");
//     throw error;
//   }

//   if (request.role == "admin") {
//     Category.findByIdAndDelete({ _id: request.body.id })
//       .then((data) => {
//         if (data == null) throw new Error("Category not found");
//         response.status(201).json({ message: "deleted", data });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else {
//     response
//       .status(404)
//       .json({ msg: "You should be admin to delete category" });
//   }
// };

exports.delete_category = (request, response, next) => {

  if (request.role == "admin") {
    Category.findByIdAndDelete({ _id: request.params.id })
      .then((data) => {
        console.log("id:", request.params.id);
        response.status(201).json({ message: "deleted", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};

//Update by id in body
// exports.update_category = (request, response, next) => {
//   let errors = validationResult(request);
//   if (!errors.isEmpty()) {
//     let error = new Error();
//     error.status = 422;
//     error.message = errors.array().reduce((current, object) => {
//       current + object.msg + " ", "";
//     });
//     throw error;
//   }
//   if (request.role == "admin") {
//     Category.findByIdAndUpdate(
//       { _id: request.body.id },
//       {
//         $set: {
//           name: request.body.name,
//           description: request.body.description,
//           bannerImage: request.body.bannerImage,
//         },
//       }
//     )
//       .then((data) => {
//         response.status(201).json({ message: " updated", data });
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else {
//     response.status(404).json({ msg: "You should be admin to edit category" });
//   }
// };

exports.update_category = async (request, response) => {
  if (request.role == "admin") {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updatedCategory);
    } catch (err) {
      response.status(500).json(err.message);
    }
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};


exports.add_category = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  if (request.role == "admin") {
    let object = new Category({
      // _id: auto_id,
      name: request.body.name,
      description: request.body.description,
      bannerImage: request.body.bannerImage,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ message: "added", data });
      })
      .catch((error) => next(error));
  } else {
    response.status(404).json({ msg: "You should be admin to add category" });
  }

  //   });
};
