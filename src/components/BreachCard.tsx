import { Shield, AlertTriangle, Calendar, Users } from 'lucide-react';
import { BreachData } from '../types/breach';

interface BreachCardProps {
  breach: BreachData;
}

export function BreachCard({ breach }: BreachCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {breach.LogoPath ? (
            <img
              src={`https://haveibeenpwned.com${breach.LogoPath}`}
              alt={breach.Title}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{breach.Title}</h3>
            {breach.Domain && (
              <p className="text-sm text-gray-500">{breach.Domain}</p>
            )}
          </div>
        </div>
        {breach.IsVerified && (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            <Shield className="w-4 h-4" />
            <span>Verified</span>
          </div>
        )}
      </div>

      <div
        className="text-gray-700 mb-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: breach.Description }}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-500">Breach Date</p>
            <p className="font-medium text-gray-900">{formatDate(breach.BreachDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-500">Affected Accounts</p>
            <p className="font-medium text-gray-900">{formatNumber(breach.PwnCount)}</p>
          </div>
        </div>
      </div>

      {breach.DataClasses.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Compromised Data:</p>
          <div className="flex flex-wrap gap-2">
            {breach.DataClasses.map((dataClass) => (
              <span
                key={dataClass}
                className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {dataClass}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
