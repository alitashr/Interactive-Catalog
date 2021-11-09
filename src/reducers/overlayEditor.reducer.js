import React from "react";

const EditorStateContext = React.createContext();
const EditorDispatchContext = React.createContext();

const SET_OVERLAYDIVLINKS = "SET_OVERLAYDIVLINKS";
const SET_EDITORMODE = "SET_EDITORMODE";
const mainEditorActions = {
  SET_OVERLAYDIVLINKS,
  SET_EDITORMODE,
};
const initialEditorState = {
  editorMode: false,
  links: [],
};
const mainEditorReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(type)
  switch (type) {
    case SET_OVERLAYDIVLINKS:
      return { ...state, links: payload };
    case SET_EDITORMODE:
      return { ...state, editorMode: payload };

    default:
      return state;
  }
};
function EditorStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(mainEditorReducer, initialEditorState);
  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>{children}</EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
}
function useEditorState() {
  const context = React.useContext(EditorStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
function useEditorDispatch() {
  const context = React.useContext(EditorDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}
export { EditorStateProvider, useEditorState, useEditorDispatch, mainEditorActions };
