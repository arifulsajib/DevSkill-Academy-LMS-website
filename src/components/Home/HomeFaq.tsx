import { useGetLayoutQuery } from "../../Redux/features/api/layoutApiSlice";
import Loading from "../utils/Loading";
import SectionHeading from "../utils/SectionHeading";

interface Props {
  isRoute?: boolean;
}

const HomeFaq = ({ isRoute }: Props) => {
  const { data, isFetching, isLoading } = useGetLayoutQuery({ type: "FAQ" });
  const limit = isRoute ? data?.layout?.faq?.length : 4;
  return (
    <section className={`my-5 px-4 md:px-20 ${isRoute && "min-h-[80vh]"}`}>
      <SectionHeading sectionTitle="Frequently asked questions" title="Take a look at our fAQs" />

      {isFetching || isLoading ? (
        <Loading />
      ) : (
        data?.layout?.faq?.slice(0, limit).map((faq) => (
          <div className="collapse collapse-arrow bg-base-200 my-3" key={faq._id}>
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">{faq.question}</div>
            <div className="collapse-content">
              <p className="text-lg">{faq.answer}</p>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default HomeFaq;
