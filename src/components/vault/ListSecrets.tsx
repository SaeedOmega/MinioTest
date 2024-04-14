import { Fragment, useEffect, useState } from "react";
import useStore from "../../stores/store";
import useVault from "../../stores/vault";
import { DeleteVault, ListVaultSecrets } from "../../repository/vault";
import { Link, useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const ListSecrets = () => {
  // vault objects for list
  const [objects, setObjects] = useState<string[]>([]);
  const { refreshValue, refresh, setErrorMessage } = useStore();
  const { selectItem, refreshPath } = useVault();
  const navigate = useNavigate();
  useEffect(() => {
    const directory = location.pathname.replace("/vault", "");
    ListVaultSecrets(
      directory,
      (res: any) => {
        setObjects(res);
      },
      (err) => {
        const path = location.pathname.replace("/", "").split("/");
        if (!err.message.includes("404") || path.length !== 1)
          setErrorMessage(err.message);
      }
    );
    refreshPath();
  }, [refreshValue, location.pathname]);

  return (
    <>
      <List>
        <ListItem key={999}>
          <ListItemText
            className="font-medium p-4 pb-3 text-slate-500"
            primary="Name"
          />
        </ListItem>
        {location.pathname.split("/").length > 2 && (
          <ListItem
            key={99}
            onClick={() => {
              navigate(-1);
            }}
            className="bg-slate-800 transition-colors duration-250 hover:bg-slate-300 cursor-pointer mb-0.5 rounded-xl !p-0 text-slate-400 hover:!text-slate-800"
          >
            <ListItemText
              primary="..."
              className="items-center p-4 flex justify-between border-slate-100  w-full"
            />
          </ListItem>
        )}
        {objects?.map((b, index) => {
          return (
            <Fragment key={index}>
              {b[b.length - 1] === "/" ? (
                <ListItem className="bg-slate-800 transition-colors duration-250 hover:bg-slate-300 cursor-pointer mb-0.5 rounded-xl !p-0 text-slate-400 hover:!text-slate-800">
                  <Link
                    className="w-full h-full"
                    to={location.pathname + "/" + b.replace("/", "")}
                  >
                    <ListItemText
                      primary={b}
                      className="items-center p-4 flex justify-between border-slate-100  w-full"
                    />
                  </Link>
                </ListItem>
              ) : (
                <ListItem
                  onClick={() => {
                    if (b[b.length - 1] !== "/") selectItem(b);
                  }}
                  className="bg-slate-800 transition-colors duration-250 hover:bg-slate-300 cursor-pointer mb-0.5 rounded-xl !p-0 text-slate-400 hover:!text-slate-800"
                >
                  <ListItemText
                    primary={b}
                    className="items-center p-4 flex justify-between border-slate-100  w-full"
                  />
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      DeleteVault(
                        b,
                        () => {
                          refresh();
                        },
                        (err) => {
                          setErrorMessage(err.message);
                        }
                      );
                    }}
                    className="pr-2 ml-2"
                    sx={{
                      color: "white",
                      "&:hover ": {
                        color: "#475569",
                      },
                    }}
                  >
                    delete
                  </Button>
                </ListItem>
              )}
            </Fragment>
          );
        })}
      </List>
    </>
  );
};

export default ListSecrets;
