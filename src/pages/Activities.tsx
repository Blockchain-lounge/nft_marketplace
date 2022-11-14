import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Heading2, Select, Select2, SelectCheckBox } from "../components/atoms";
import { ISelectCheckProps } from "../components/atoms/SelectCheckbox";
import { CloseIcon } from "../components/atoms/vectors";
import { Tab2, TransactionCard } from "../components/molecules";
import { Footer } from "../components/organisms";
import { apiRequest } from "../functions/offChain/apiRequests";
import DashboardLayout from "../template/DashboardLayout";
import { ITransactionCard } from "../utilities/types";

const Activities = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [activities, setActivities] = useState<Array<ITransactionCard>>([]);
  const [currentEvent, setCurrentEvent] = useState<{
    name: string;
    value: string;
  }>({
    name: "All",
    value: "",
  });
  const [collections, setCollections] = useState([
    {
      label: "Clonex",
      isVerified: true,
      img: "/images/nftsample2.png",
      checked: false,
    },
    {
      label: "VibeyApe",
      isVerified: false,
      img: "/images/ape.png",
      checked: false,
    },
    {
      label: "Clonex",
      isVerified: false,
      img: "/images/nftsample2.png",
      checked: false,
    },
    {
      label: "Clonex",
      isVerified: false,
      img: "/images/nftSample3.png",
      checked: false,
    },
  ]);
  const [selectedCollection, setSelectedCollection] = useState<
    ISelectCheckProps[]
  >([]);

  // const tabs = ["1 h", "6 h", "24 h", "1 w", "1 m", "All"];

  const activitiesData = [
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "listing",
      coinName: "CloneX#5434",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/nftSample3.png",
      transactionType: "add",
      collectionName: "Clone X",
      user: "Mike0xf🔑",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/profile-nft.png",
      transactionType: "purchase",
      user: "jakes💸",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "listing",
      coinName: "CloneX#5434",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "bid",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "bid",
      address: "0x19f...1138",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftsample2.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/nftSample3.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/profile-nft.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
    {
      imgUrl: "/images/Dreamy-ape.png",
      transactionType: "transfer",
      user: "Zara",
      address: "0xb4d...002d",
    },
  ];
  const events = [
    { name: "All", value: "" },
    { name: "Sales", value: "" },
    { name: "Newly listed Item", value: "newly_listed_item" },
    { name: "Newly Created Item", value: "newly_created_item" },
    { name: "Offers", value: "" },
    { name: "Transfers", value: "" },
  ];

  const sorting = [{ name: "Ascending", value: "asc" }];

  const fetchActivities = async () => {
    try {
      const HEADER = {};
      const REQUEST_URL = "/activities";
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          console.log(response.data);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
  };

  useEffect(() => {
    try {
      const HEADER = {};
      const REQUEST_URL = "/activities";
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          // console.log(response.data);
          setActivities([...activities, ...response.data.data]);
        } else {
          toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvent.name]);

  // console.log({ activities });

  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center">
          <div className="collection-page-top">
            <div className="collection-page-sub-top">
              <Heading2 title="Activities" />
              <Select2
                title="Event type"
                placeholder={
                  typeof currentEvent === "object" ? currentEvent.name : ""
                }
                onClick={
                  setCurrentEvent as React.Dispatch<
                    React.SetStateAction<string | Record<string, string>>
                  >
                }
                lists={events}
                wt="w-[12rem]"
              />
              {/* <SelectCheckBox
                lists={collections}
                //@ts-ignore
                setLists={setCollections}
                title="Collection"
                selectedLists={selectedCollection}
                newLists={setSelectedCollection}
              /> */}
              {/* <Select title="Chains" /> */}
            </div>
            {/* <Tab2
              tabs={tabs}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
            /> */}
          </div>
          <div className="flex items-center gap-x-4 mb-6">
            {selectedCollection.map((val, i) => (
              <div
                key={val.label + i}
                className="p-4 bg-bg-5 rounded-md gap-x-4 flex items-center"
              >
                <div className="flex items-center gap-x-3">
                  {val.img && (
                    <span className="relative h-[2.375rem] w-[2.375rem]">
                      <Image
                        src={val.img as string}
                        alt={val.label}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </span>
                  )}
                  {val.label}
                  {val.isVerified && (
                    <span className="relative h-5 w-5">
                      <Image
                        src="/images/verify.svg"
                        alt={val.label}
                        layout="fill"
                        objectFit="cover"
                      />
                    </span>
                  )}
                </div>
                <span className="cursor-pointer">
                  <CloseIcon />
                </span>
              </div>
            ))}
          </div>
          <div className="total-earnings-history-wrapper">
            {activitiesData.map((txn, i) => (
              <TransactionCard key={i + 1} {...txn} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </DashboardLayout>
  );
};

export default Activities;
