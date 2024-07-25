
const SkeletonOne = ({ image }) => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto shadow-2xl group h-full">
        <div className="flex w-full h-full flex-col space-y-2">
          <img
            src={image}
            alt="header"
            width="800"
            height="800"
            className="h-full w-full aspect-square object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonOne;
