import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import CookieManager from "@react-native-cookies/cookies";
import CustomTextInput from "./src/components/CustomTextInput";
import Navigation from "./src/navigation/Navigation";

export default function App(props) {
  const [info, setInfo] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [cookies, setCookies] = useState("");
  const [token, setToken] = useState("");
  const [entitlement, setEntitlement] = useState("");
  const [ownID, setOwnID] = useState("");
  const [storeID, setStoreID] = useState([]);
  const [skin, setSkin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getInfo = async (more) => {
    try {
      const response = await fetch(
        `https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/52e9749a-429b-7060-99fe-4595426a0cf7?size=${pageSize}&startIndex=0&api_key=RGAPI-8db1551b-8a97-4e71-aab8-b67001b3f378`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setInfo(json.players);
        info.forEach((e) => console.log(e.gameName));
      } else {
        Alert.alert("WOAH");
      }
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  };

  //GETS COOKIES
  const getCookies = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      client_id: "play-valorant-web-prod",
      nonce: "1",
      redirect_uri: "https://playvalorant.com/opt_in",
      response_type: "token id_token",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://auth.riotgames.com/api/v1/authorization", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //GETS AUTH
  const getAuth = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Cookie",
    //   "__cf_bm=R5OxEnFo2grHHD02ALHO3BTVXTZS4E7gUIco2GnAprU-1652044067-0-ASf8B5Yj4pI6FVnLXXriqbyPVFkXSmL6GadSiQX+rRu3hC9OQIEVgdp6kB2DQ3Y2jFfljick4blZxTFTjnS6Xg0=; tdid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkZGEyZjQ4LTI4YTItNDRhMC05ODM2LTRjOGE5YTA1NzA1MCIsIm5vbmNlIjoiMnIvUjIxNU1CQzQ9IiwiaWF0IjoxNjUyMDQ0MjEyfQ.FIAiciNukdP2HghbpGBYwA9iZWOiWfBeA0zEd79zhEY; clid=uw1; csid=HwhlgLtovUK9LGQD-s3X_A.lzPCbUM5dyaQKj2mT9WFaA; ssid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzc2lkIjoiSHdobGdMdG92VUs5TEdRRC1zM1hfQS5selBDYlVNNWR5YVFLajJtVDlXRmFBIiwic3ViIjoiYjQ2MzA4NTQtZjkyOC01OWU5LWI0MzAtZWEzZjFhNTcwZWZkIiwibG9naW5Ub2tlbiI6ImJiNGJjNzg4LTUzMWItNDdiYS04NzNlLTcyZjAwZDQ1M2I5MSIsInNlcmllc1Rva2VuIjoiMzU1NzBjYTEtN2ZhMS00YzA4LTg2NTMtMWRhZTQ1MDI4MWJmIiwiaWF0IjoxNjUyMDQ0MjEyfQ.kxtvgWaTagBcgu-KFn_3aiPFT8WILQzF6j9DFpsLlMo; sub=b4630854-f928-59e9-b430-ea3f1a570efd"
    // );

    const raw = JSON.stringify({
      type: "auth",
      // username: username,
      // password: password,
      username: "turnlane",
      password: "Halohalo2!",
      remember: true,
      language: "en_US",
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "https://auth.riotgames.com/api/v1/authorization",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let newRes = result.response.parameters.uri;
        let userToken = newRes.slice(
          newRes.indexOf("=") + 1,
          newRes.indexOf("&")
        );
        console.log(userToken);
        setToken(userToken);
        // console.log(newRes.slice(newRes.indexOf("=") + 1, newRes.indexOf("&")));
      })
      .catch((error) => console.log("error", error));
  };

  const handleUsername = (value) => {
    setUsername(value);
    console.log(username);
  };
  const handlePassword = (value) => {
    setPassword(value);
    console.log(password);
  };

  const handleSignIn = () => {};

  // VIEW COOKIES
  const viewCookie = () => {
    CookieManager.getAll().then((cookies) => {
      console.log("CookieManager.getAll =>", cookies);
    });
  };

  // CLEARS COOKIES
  const clearCookie = () => {
    CookieManager.clearAll().then((success) => {
      console.log("CookieManager.clearAll =>", success);
    });
  };

  // GETS ENTITLEMENT TOKEN
  const getEntitlement = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Cookie",
    //   "__cf_bm=u3fgk4Ddl59x.F6oMI.U6yTroDX0QjXSkEv6HbZ.9sw-1652044948-0-AZies6DMVc3762X5fw7PdPyE5SfKjL7JHjVrvWUju95mvHHzSxyKFg8+ddFShT4dUJlJiB+liuABs7S/Oal4NU0="
    // );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      "https://entitlements.auth.riotgames.com/api/token/v1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.entitlements_token);
        setEntitlement(result.entitlements_token);
      })
      .catch((error) => console.log("error", error));
  };

  //GETS PLAYERS IDS
  const getPlayerId = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Riot-Entitlements-JWT", entitlement);
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "X-Riot-ClientVersion",
      "release-04.08-shipping-15-701907"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      "https://pd.na.a.pvp.net/mmr/v1/leaderboards/affinity/na/queue/competitive/season/573f53ac-41a5-3a7d-d9ce-d6a6298e5704?startIndex=0&size=10",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //GETS OWN USERS ID
  const getOwnId = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append(
    //   "Cookie",
    //   "__cf_bm=u3fgk4Ddl59x.F6oMI.U6yTroDX0QjXSkEv6HbZ.9sw-1652044948-0-AZies6DMVc3762X5fw7PdPyE5SfKjL7JHjVrvWUju95mvHHzSxyKFg8+ddFShT4dUJlJiB+liuABs7S/Oal4NU0="
    // );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://auth.riotgames.com/userinfo", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.sub);
        setOwnID(result.sub);
      })
      .catch((error) => console.log("error", error));
  };

  //GETS USERS ITEMS IN SHOP
  const getStore = async () => {
    const myHeaders = new Headers();
    myHeaders.append("X-Riot-Entitlements-JWT", entitlement);
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://pd.na.a.pvp.net/store/v2/storefront/${ownID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.SkinsPanelLayout.SingleItemOffers);
        setStoreID(result.SkinsPanelLayout.SingleItemOffers);
      })
      .catch((error) => console.log("error", error));
  };

  //GETS IMAGES FOR SKINS IN SHOP **** NEEDS WORK
  const getSkinLevel = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const promises = storeID.map((item) => {
      return fetch(
        `https://valorant-api.com/v1/weapons/skinlevels/${item}`,
        requestOptions
      ).then((response) => {
        return response.json();
      });
    });

    Promise.all(promises).then((results) => {
      const videos = results.map((result) => result.data.displayIcon);
      console.log(videos);
      setSkin(videos);
    });

    // NEED TO MADE REQUEST FOR EACH ID SOMEHOW
    // storeID.forEach(async (e, i) => {

    //   fetch(
    //     `https://valorant-api.com/v1/weapons/skinlevels/${e}`,
    //     requestOptions
    //   )
    //     .then((response) => response.json())
    //     .then((result) => {
    //       // console.log(result.data.displayIcon);
    //       setSkin(result.data.displayIcon);
    //       console.log(skin)
    //       // return <View>
    //       //   <Text>
    //       //     {skin}
    //       //   </Text>
    //       // </View>
    //     })
    //     .catch((error) => console.log("error", error));
    // });
  };

  const getAll = async () => {
    await getCookies();
    await getAuth();
    await getEntitlement();
    await getOwnId();
  };

  useEffect(() => {
    console.log(username);
    console.log(password);
  }, [username, password]);

  // useEffect(() => {
  //   (async () => {
  //     getAll();
  //   })();
  //   return () => {};
  // })

  const data = (
    <View>
      <FlatList
        data={info}
        keyExtractor={(item) => item.gameName}
        renderItem={({ item }) => (
          <View>
            <Text>{item.gameName}</Text>
          </View>
        )}
      />
    </View>
  );

  const content = (
    <View>
      {/* {skin.map(e => (
        <View>
          <Text>{e}</Text>
        </View>
      ))} */}
      <FlatList
        data={skin}
        // keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      {/* <Text style={{ marginTop: 400 }} onPress={getInfo}>
        Open up App.js to start working on your app!
      </Text>
      <TouchableOpacity onPress={getCookies}>
        <Text>Cookies</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={viewCookie}>
        <Text>View cookie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearCookie}>
        <Text>Clear cookie</Text>
      </TouchableOpacity>

      <CustomTextInput
        value={username}
        onChangeText={handleUsername}
        placeholder="Enter Username"
      />

      <CustomTextInput
        value={password}
        onChangeText={handlePassword}
        placeholder="Enter Password"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={getAuth}>
        <Text>Auth</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getEntitlement}>
        <Text>Entitlement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getPlayerId}>
        <Text>Player ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getOwnId}>
        <Text>Own ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getStore}>
        <Text>Get Store</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getAll}>
        <Text>GET ALL</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getSkinLevel}>
        <Text>GET Skin</Text>
      </TouchableOpacity>
      <FlatList
        data={skin}
        // keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View>
           <Image style={{ width: 150, height: 50 }} source={{ uri: item }} />
          </View>
        )}
      />
      {data}
      <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
