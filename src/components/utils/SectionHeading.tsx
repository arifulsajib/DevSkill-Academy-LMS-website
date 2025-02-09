interface Props {
  sectionTitle?: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ sectionTitle, title, description }: Props) => {
  return (
    <div className=" flex justify-center mb-4 lg:mb-0">
      <div className="text-center w-full lg:w-8/12">
        {sectionTitle && <p className="text-success uppercase font-semibold">{sectionTitle}</p>}
        <h1 className="text-3xl font-bold my-3 mb-4 capitalize">{title}</h1>
        {description && <p className="text-lg lg:w-10/12 mx-auto my-5">{description}</p>}
      </div>
    </div>
  );
};

export default SectionHeading;
