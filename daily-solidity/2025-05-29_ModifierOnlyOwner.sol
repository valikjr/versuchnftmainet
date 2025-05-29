// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title OnlyOwner Example
/// @author Samurai

contract OnlyOwner {
    address public besitzer;

    constructor() {
        besitzer = msg.sender;
    }

    modifier nurBesitzer() {
        require(msg.sender == besitzer, "Du bist kein Besitzer!");
        _;
    }

    string private geheimText;

    function setGeheimText(string memory _text) public nurBesitzer {
        geheimText = _text;
    }

    function getGeheimText() public view returns (string memory) {
        return geheimText;
    }
}
