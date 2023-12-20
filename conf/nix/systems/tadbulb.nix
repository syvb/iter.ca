{ config, pkgs, ... }:
{
  imports = [ ../base.nix ../interactive.nix ];

  networking.hostName = "tadbulb";

  # stateVersion - do not change without reading docs!
  system.stateVersion = "23.05"; # Did you read the comment?
}
