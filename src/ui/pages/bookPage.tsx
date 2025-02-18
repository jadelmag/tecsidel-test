import CustomTable from "@/ui/components/table";

const BookPage = () => {
  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Books Table</h1>
      <CustomTable />
    </div>
  );
};

export default BookPage;
