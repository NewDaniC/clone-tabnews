import useSWR from "swr";

const refreshInterval = 10000;

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h2>Database</h2>
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div> Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval,
  });

  let databaseVersionText = "Carregando...";
  let databaseOpenedConnectionsText = "Carregando...";
  let databaseMaxConnectionsText = "Carregando...";

  if (!isLoading && data) {
    const database = data.dependencies.database;

    databaseVersionText = database.version;
    databaseOpenedConnectionsText = database.opened_connections;
    databaseMaxConnectionsText = database.max_connections;
  }

  return (
    <div>
      <div>Versão: {databaseVersionText}</div>
      <div>Conexões abertas: {databaseOpenedConnectionsText}</div>
      <div>Máximo de conexões: {databaseMaxConnectionsText}</div>
    </div>
  );
}
