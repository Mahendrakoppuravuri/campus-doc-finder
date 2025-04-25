
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export function useQueryParams() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setQueryParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const newParams = new URLSearchParams(location.search);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          newParams.delete(key);
          value.forEach((val) => {
            newParams.append(key, val);
          });
        } else {
          newParams.set(key, value);
        }
      });

      navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
    },
    [location.pathname, location.search, navigate]
  );

  const getQueryParam = useCallback(
    (key: string): string | string[] | null => {
      const values = queryParams.getAll(key);
      if (values.length === 0) return null;
      return values.length === 1 ? values[0] : values;
    },
    [queryParams]
  );

  return { queryParams, setQueryParams, getQueryParam };
}
