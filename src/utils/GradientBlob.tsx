const GradientBlob = ({ className }: { className: string }) => (
  <div
    className={`absolute rounded-full blur-[80px] md:blur-[100px] opacity-20 pointer-events-none ${className}`}
  />
);

export default GradientBlob;
