interface IButtonWithProgressProps {
  className: string;
  disabled: boolean;
  onClick: () => void;
  pendingApiCall: boolean;
  text: string;
}

export function ButtonWithProgress({
  className,
  disabled,
  onClick,
  pendingApiCall,
  text,
}: IButtonWithProgressProps) {
  return (
    <button
      className={className || "btn btn-primary"}
      disabled={disabled}
      onClick={onClick}
    >
      {pendingApiCall && (
        <div
          className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
          role="status"
        ></div>
      )}
      {text || "Salvar"}
    </button>
  );
}
