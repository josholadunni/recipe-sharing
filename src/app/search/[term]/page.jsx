import H1 from "../../components/H1";
export default async function SearchPage(params) {
  const { term } = params.params;

  return (
    <div>
      <H1 text={`${term} Recipes`}></H1>
    </div>
  );
}
