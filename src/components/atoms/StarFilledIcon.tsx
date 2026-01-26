export const StarFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: {
  size?: number;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      fill="currentColor" // Aquí es donde ocurre la magia del relleno
      {...props}
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};
