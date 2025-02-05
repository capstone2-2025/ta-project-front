import { BigButton } from "./BigButton";
import React from "react";

export function ConfirmOrCancel({
  onCancel,
  onConfirm,
  confirmTitle = "확인",
  leftBlock,
  hideCancel,
  disabled
}) {
  const styles = {
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    cancel: {
      marginRight: 8,
    },
  };

  return (
    <div style={styles.actions}>
      <div>{leftBlock}</div>
      <div>
        {!hideCancel ? (
          <BigButton
            title={"취소"}
            style={styles.cancel}
            onClick={onCancel}
          />
        ) : null}
        <BigButton title={confirmTitle} inverted={true} onClick={onConfirm} disabled={disabled}/>
      </div>
    </div>
  );
}
