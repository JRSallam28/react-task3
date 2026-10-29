import { useRef, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const App = () => {
  const nameInput = useRef();
  const priceInput = useRef();
  const qtyInput = useRef();

  const editNameInput = useRef();
  const editPriceInput = useRef();
  const editQtyInput = useRef();
  const [editIndex, setEditIndex] = useState();
  
  const [product, setproducts] = useState([
    { name: "Iphone X", price: 500, qty: 5 },
    { name: "Iphone 11", price: 500, qty: 5 },
    { name: "Iphone 12", price: 500, qty: 5 },
    { name: "Iphone 13", price: 500, qty: 5 },
    { name: "Iphone 14", price: 500, qty: 5 },
  ]);

  const savePhone = () => {
    let newPhone = {
      name: nameInput.current.value,
      price: priceInput.current.value,
      qty: qtyInput.current.value,
    };
    let copy = [...product];
    copy.push(newPhone);
    setproducts(copy);
    document.getElementById("my_modal_1").close();
  };

  const deletePhone = (index) => {
    let copy = [...product];
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          copy.splice(index, 1);
          setproducts(copy);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel)
          /* Read more about handling dismissals below */
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
      });
  };

  const editPhone = (index) => {
    document.getElementById("Edit").showModal();
    let phoneEdit = product[index];
    editNameInput.current.value = product[index].name;
    editPriceInput.current.value = product[index].price;
    editQtyInput.current.value = product[index].qty;
    setEditIndex(index);
  };

  const saveEditPhone = () => {
    let phoneToEdit = {
      name: editNameInput.current.value,
      price: editPriceInput.current.value,
      qty: editQtyInput.current.value,
    };

    let copy = [...product];
    copy.splice(editIndex, 1, phoneToEdit);
    setproducts(copy);

    document.getElementById("Edit").close();
  };
  return (
    <div
      className="w-full h-dvh overflow-auto flex justify-center"
      data-theme="light"
    >
      <div className="container ">
        <h1 className="bg-gray-500 py-4 text-white text-2xl text-center ">
          myProducts
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add New
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New phone</h3>

            <div className="modal-action">
              <div method="dialog" className="w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter Phone Name"
                  ref={nameInput}
                  className="input w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Phone price"
                  ref={priceInput}
                  className="input w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Phone qty"
                  ref={qtyInput}
                  className="input w-full"
                />
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      savePhone();
                    }}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>

        <dialog id="Edit" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Phone</h3>

            <div className="modal-action">
              <div method="dialog" className="w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter Phone Name"
                  ref={editNameInput}
                  className="input w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Phone price"
                  ref={editPriceInput}
                  className="input w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Phone qty"
                  ref={editQtyInput}
                  className="input w-full"
                />
                <div className="w-full flex justify-between">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      saveEditPhone();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => document.getElementById("Edit").close()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>

        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>product name</th>
              <th>product price</th>
              <th>product qty</th>
            </tr>
          </thead>
          <tbody>
            {product.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.price} USD</td>
                  <td>{el.qty}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        className="btn hover:btn-error cursor-pointer"
                        onClick={() => {
                          deletePhone(index);
                        }}
                      >
                        <IoTrashOutline />
                      </button>
                      <button
                        className="btn hover:btn-warning cursor-pointer"
                        onClick={() => {
                          editPhone(index);
                        }}
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
