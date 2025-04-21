import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface WalletInfoProps {
  address: string;
  networkName: string;
  balance: string;
  getExplorerUrl: (address: string) => string;
}

function WalletInfo({
  address,
  networkName,
  balance,
  getExplorerUrl,
}: WalletInfoProps) {
  // Format the balance based on network
  const formattedBalance =
    networkName === "Cardano"
      ? `${balance} ADA`
      : `${Number.parseFloat(balance || "0").toFixed(4)} ETH`;

  // Format the address for display
  const displayAddress =
    address.length > 20
      ? `${address.substring(0, 10)}...${address.substring(
          address.length - 10
        )}`
      : address;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Address</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground truncate">
                {displayAddress}
              </p>
              <a
                href={getExplorerUrl(address)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Network</p>
            <p className="text-sm text-muted-foreground">{networkName}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Balance</p>
            <p className="text-sm text-muted-foreground">{formattedBalance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WalletInfo;
