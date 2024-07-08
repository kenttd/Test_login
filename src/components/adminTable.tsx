import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, getColumns } from "@/components/datatable";
export function AdminTable({
  update,
  setUpdate,
  data,
  setData,
  setStatus,
}: any) {
  return (
    <Tabs defaultValue="pending" className="p-3">
      <TabsList>
        <TabsTrigger
          value="pending"
          onClick={() => {
            setData([]);
            setStatus("Pending");
            setUpdate(!update);
          }}
        >
          Pending
        </TabsTrigger>
        <TabsTrigger
          value="accepted"
          onClick={() => {
            setData([]);
            setStatus("Accepted");
            setUpdate(!update);
          }}
        >
          Accepted
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <DataTable
          columns={getColumns(update, setUpdate, false)}
          data={data}
        />
      </TabsContent>
      <TabsContent value="accepted">
        <DataTable columns={getColumns(update, setUpdate, true)} data={data} />
      </TabsContent>
    </Tabs>
  );
}
