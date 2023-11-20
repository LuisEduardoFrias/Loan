"use client";

import React, { useState, useEffect, ReactElement, ChangeEvent } from "react";
import CardNotification, { ModalType } from "./card_notification";
import LdDualRing from "./ld_dual_ring";

export interface INotification {
  show: boolean;
  type: ModalType;
  title: string;
  text: string;
}

interface IFormsProp<T> {
  operation: (
    data: T[],
    setLoader: (show: boolean) => void,
    setNotif: (obj: INotification) => void,
  ) => void;
  children: ReactElement | ReactElement[];
}

export default function Form<T>(props: IFormsProp<T>): ReactElement {
  const init = {
    show: false,
    type: ModalType.notification,
    title: "",
    text: "",
  };

  const [state, setState] = useState<T[]>([]);
  const [notif, setNotif] = useState<INotification>(init);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {}, [notif, showLoader]);

  function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowLoader(true);
    props.operation(state, setShowLoader, setNotif);
    clear();
  }

  function clear() {
    const formElements = Array.from(
      document.querySelectorAll("input, select, textarea"),
    ) as HTMLElement[];

    formElements.forEach((element: HTMLElement) => {
      if ("type" in element && typeof element.type === "string") {
        const elementType = element.type.toLowerCase();
        switch (elementType) {
          case "text":
          case "password":
          case "email":
          case "number":
          case "search":
          case "tel":
          case "url":
          case "textarea":
            (element as HTMLInputElement | HTMLTextAreaElement).value = "";
            break;

          case "radio":
          case "checkbox":
            (element as HTMLInputElement).checked = false;
            break;

          case "select-one":
          case "select-multiple":
            (element as HTMLSelectElement).selectedIndex = -1;
            break;

          default:
            break;
        }
      }
    });
  }

  const getInputValue = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): string | number => {
    const target = event.currentTarget as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { type, name, value } = target;

    if (type === "number") {
      return Number(value);
    }

    return value;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.type === "file") {
        const file = e.currentTarget.files?.[0];
        const name = e.currentTarget.name;

        if (file) {
          const reader = new FileReader();

          reader.onloadend = async () => {
            setState({
              ...state,
              [name]: reader.result as string,
            });
          };

          reader.readAsDataURL(file);
        }
      } else {
        const value = getInputValue(e);

        setState({
          ...state,
          [e.currentTarget.name]: value,
        });
      }
    }
  };

  /*

  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) {
    if (e.currentTarget instanceof HTMLInputElement) {
      if (e.currentTarget.type == "file") {
        const file = e.currentTarget.files?.[0];
        const name = e.currentTarget.name;

        if (file) {
          const reader = new FileReader();

          reader.onloadend = async () => {
            setState({
              ...state,
              [name]: reader.result as string,
            });
          };

          reader.readAsDataURL(file);
        }
      } else {
        if (e.currentTarget.type === "number") {
          setState({
            ...state,
            [e.currentTarget.name]: Number(e.currentTarget.value),
          });
        } else {
          setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value,
          });
        }
      }
    }
  }

*/

  function addOnChangeToFormComponents(
    child: ReactElement,
    index: number,
  ): ReactElement {
    const { type } = child.props;

    if (type === "input" && child.props.onChange === undefined) {
      return React.cloneElement(child, {
        onChange: handleChange,
        key: index,
      });
    }

    if (type === "textarea" && child.props.onChange === undefined) {
      return React.cloneElement(child, {
        onChange: handleChange,
        key: index,
      });
    }

    if (type === "select" && child.props.onChange === undefined) {
      return React.cloneElement(child, {
        onChange: handleChange,
        key: index,
      });
    }

    if (child.props.onChange === undefined) {
      return React.cloneElement(child, {
        onChange: handleChange,
        key: index,
      });
    }

    return child;
  }

  const formComponents = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const formComponentsWithOnChange = formComponents.map(
    addOnChangeToFormComponents,
  );

  return (
    <>
      <CardNotification
        show={notif.show}
        type={notif.type}
        title={notif.title}
        dialog={notif.text}
        onClick3={(event: any) => {}}
      />

      <LdDualRing show={showLoader} />

      <form onSubmit={Submit}>{formComponentsWithOnChange}</form>
    </>
  );
}
