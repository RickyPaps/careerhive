import {
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  BlobServiceClient,
} from "@azure/storage-blob";

export const containerName = "posts";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

if (!accountName || !accountKey) {
  throw new Error(
    "Missing environment variables: AZURE_STORAGE_ACCOUNT_NAME and AZURE_STORAGE_ACCOUNT_KEY",
  );
}

const sharedKey: StorageSharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey,
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKey,
);

async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.read = true;
  permissions.create = true;
  permissions.write = true;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getMinutes() + 30);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions,
      expiresOn: expiryDate,
    },
    sharedKey,
  ).toString();

  return sasToken;
}

export default generateSASToken;
