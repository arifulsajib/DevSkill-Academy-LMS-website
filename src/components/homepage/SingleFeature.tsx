interface Props {
  icon: string;
  iconColor: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  inverted?: boolean;
}

const SingleFeature = ({ icon, iconColor, title, subTitle, description, image, inverted = false }: Props) => {
  return (
    <div className="grid grid-cols-6 gap-6 my-6 items-center">
      <div className={`col-span-6 lg:col-span-3 order-1 ${inverted ? "lg:order-2" : "lg:order-1"}`}>
        <div className={`w-11 h-11 bg-${iconColor} rounded-full flex justify-center items-center bg-opacity-25 backdrop-blur-md`}>
          <i className={`${icon} fa-xl text-${iconColor}`}></i>
        </div>
        <p className={`text-${iconColor} font-semibold my-3`}>{title}</p>
        <h1 className="text-2xl font-bold my-3">{subTitle}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div className={`col-span-6 lg:col-span-3 order-2 ${inverted ? "lg:order-1" : "lg:order-2"}`}>
        <img src={image} alt="" className="w-full pt-8 lg:pt-24 p-6 max-w-[600px] max-h-[420px]" />
      </div>
    </div>
  );
};

export default SingleFeature;
