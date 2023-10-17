import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faTrashCan,
  faPen,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";

const Card = ({ list, setList }) => {
  const [editable, setEditable] = useState(true);
  const toggle = ({ id, open }) => {
    const updateList = list.map((i) => {
      if (i.id === id) {
        i.open = !open;
        return i;
      }
      return i;
    });
    setList(updateList);
  };

  const CardEdit = ({ id, editable }) => {
    const updateList = list.map((i) => {
      if (i.id === id) {
        i.editable = !editable;
        return i;
      }
      return i;
    });
    setEditable(editable);
    setList(updateList);
  };

  const CardDelete = ({ id, editable }) => {
    const allCards = list.filter((item) => {
      return item.id !== id;
    });
    setList(allCards);
  };

  const EditableComponent = ({ item }) => (
    <>
      <FontAwesomeIcon
        color={"red"}
        size={"1x"}
        icon={faTrashCan}
        className="icon"
        onClick={() => CardDelete({ id: item.id })}
      />
      <FontAwesomeIcon
        onClick={() => CardEdit({ id: item.id, editable: item.editable })}
        color={"#3697fe"}
        size={"1x"}
        icon={faPen}
        className="icon"
      />
    </>
  );

  const SaveOrNotComponent = ({ item }) => (
    <>
      <FontAwesomeIcon
        color={"lightgreen"}
        size={"1x"}
        icon={faCircleXmark}
        className="icon"
        onClick={() => {
        CardEdit({ id: item.id, editable: item.editable })
        }}
      />
      <FontAwesomeIcon
        onClick={() =>  {
          
          CardEdit({ id: item.id, editable: item.editable })
        }}
        color={"#3697fe"}
        size={"1x"}
        icon={faCircleCheck}
        className="icon"
      />
    </>
  );

  const handleChange = (event, propertyName, id) => {
    console.log(event.target.value, propertyName, id);

    const updateList = list.map((i) => {
      if (i.id === id) {
        i[propertyName] = event.target.value;
        return i;
      }
      return i;
    });
    setList(updateList);
  };

  const Modal = () => (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );

  return (
    <>
      {/* <Modal /> */}
      {list?.map((item, index) => {
        return (
          <div className="card" key={index}>
            <div className="always-show-panel">
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div className="logo p-5">A</div>
                {/* <div className="id">{item.id}</div> */}
                <div className="name">{item?.name}</div>
              </div>
              <div></div>
              <FontAwesomeIcon
                className="toogle"
                onClick={() => toggle({ id: item.id, open: item.open })}
                icon={item?.open ? faChevronUp : faChevronDown}
              />
            </div>
            {item?.open && (
              <div>
                <div className="metadata-container">
                  <div className="metadata-item">
                    <div className="title">Age</div>{" "}
                    <input
                      onChange={(i) => handleChange(i, "age", item.id)}
                      className={"age " + (item.editable && "editmode")}
                      value={item.age}
                    />{" "}
                  </div>
                  <div className="metadata-item">
                    <div className="title">Gender</div>{" "}
                    <input
                      onChange={(i) => handleChange(i, "gender", item.id)}
                      className={"gender " + (item.editable && "editmode")}
                      value={item.gender}
                    />
                  </div>
                  <div className="metadata-item">
                    <div className="title">Country</div>{" "}
                    <input
                      onChange={(i) => handleChange(i, "country", item.id)}
                      className={"country " + (item.editable && "editmode")}
                      value={item.country}
                    />
                  </div>
                </div>
                <div className="metadata-item">
                  <div className="title">Description</div>{" "}
                  <textarea
                    onChange={(i) => handleChange(i, "description", item.id)}
                    className={"desc " + (item.editable && "editmode")}
                    value={item.description}
                  />
                </div>
                <div className="icon-container">
                  {editable ? <EditableComponent item={item} /> : <SaveOrNotComponent item={item} />}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Card;
